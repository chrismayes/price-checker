import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Quagga from '@ericblade/quagga2';
import './CheckGrocery.css';
import ScanModal from '../modals/ScanModal';

const CheckGrocery: React.FC = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [barcode, setBarcode] = useState<string>('');
  const [readerType, setReaderType] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const quaggaStarted = useRef(false);
  const hasDetected = useRef(false);

  // Initialize Quagga2 and attach to the video container
  const initQuagga = useCallback(() => {
    if (videoRef.current) {
      console.log('Initializing Quagga2...');
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: videoRef.current,
            constraints: {
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: 'environment',
            },
          },
          decoder: {
            readers: ['upc_reader', 'ean_reader'],
          },
        },
        (err) => {
          if (err) {
            console.error('Quagga2 init error:', err);
            return;
          }
          quaggaStarted.current = true;
          Quagga.start();
          console.log('Quagga2 started, scanning...');
          setTimeout(() => {
            const videoElem = videoRef.current?.querySelector('video');
            if (videoElem) {
              videoElem.setAttribute('playsinline', 'true');
              videoElem.setAttribute('muted', 'true');
            }
          }, 500);
        }
      );

      Quagga.onDetected((result) => {
        if (!hasDetected.current && result.codeResult && result.codeResult.code) {
          const detectedCode = result.codeResult.code;
          const format = result.codeResult.format;
          const readerMapping: Record<string, string> = {
            upc_reader: 'UPC',
            ean_reader: 'EAN',
            ean_8_reader: 'EAN-8',
          };
          const friendlyReader = readerMapping[format] || format;
          console.log('Barcode detected:', detectedCode, 'using', friendlyReader);
          setBarcode(detectedCode);
          setReaderType(friendlyReader);
          hasDetected.current = true;
          Quagga.stop();
          setScanning(false);
          fetchProductData(detectedCode);
        }
      });
    } else {
      console.error('Video ref is not defined');
    }
  }, []);

  // Start scanning by opening the modal
  const startScanning = () => {
    setBarcode('');
    setReaderType('');
    setProductData(null);
    setError('');
    hasDetected.current = false;
    setScanning(true);
  };

  // Cancel scanning: stop Quagga2 and close modal
  const cancelScanning = () => {
    if (quaggaStarted.current) {
      try {
        Quagga.stop();
        console.log('Quagga2 stopped due to cancellation');
      } catch (err) {
        console.warn('Error stopping Quagga2:', err);
      }
    }
    setScanning(false);
    hasDetected.current = false;
    quaggaStarted.current = false;
  };

  // Fetch product data from the Django API using the scanned barcode
  const fetchProductData = (barcodeValue: string) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const endpoint = `${apiUrl}/api/product-from-barcode/`;
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ barcode_number: barcodeValue }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch product data (status ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Product data:', data);
        setProductData(data);
      })
      .catch((err) => {
        console.error('Error fetching product data:', err);
        setError('Error fetching product data');
      });
  };

  useEffect(() => {
    if (scanning) {
      initQuagga();
    }
    return () => {
      if (quaggaStarted.current) {
        try {
          Quagga.stop();
        } catch (err) {
          console.warn('Error stopping Quagga2 during cleanup:', err);
        }
      }
      Quagga.offDetected();
    };
  }, [scanning, initQuagga]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Check a Grocery
      </Typography>
      {barcode && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5">Detected Barcode: {barcode}</Typography>
          {readerType && (
            <Typography variant="body1">Reader Type: {readerType}</Typography>
          )}
        </Box>
      )}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {productData && productData.products && productData.products.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Product Details:</Typography>
          {(() => {
            const product = productData.products[0];

            const getOrdinal = (n: number) => {
              if (n > 3 && n < 21) return "th";
              switch (n % 10) {
                case 1:
                  return "st";
                case 2:
                  return "nd";
                case 3:
                  return "rd";
                default:
                  return "th";
              }
            };

            const formatDate = (dateStr: string) => {
              const d = new Date(dateStr);
              if (isNaN(d.getTime())) return dateStr;
              const day = d.getDate();
              const month = d.toLocaleString("default", { month: "short" });
              const year = d.getFullYear();
              return `${day}${getOrdinal(day)} ${month} ${year}`;
            };

            const walmartStore =
              product.stores &&
              product.stores.find((store: any) => store.name === "Walmart Canada");

            return (
              <>
                <Typography variant="body1">Title: {product.title}</Typography>
                <Typography variant="body2">Category: {product.category}</Typography>
                <Typography variant="body2">Description: {product.description}</Typography>
                <Typography variant="body2">Size: {product.size}</Typography>
                {walmartStore && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Price at Walmart Canada on {formatDate(walmartStore.last_update)}:{" "}
                    <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                      ${walmartStore.price}
                    </span>
                  </Typography>
                )}
                {product.images && product.images.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Box
                      component="img"
                      src={product.images[0]}
                      alt="Product Image"
                      sx={{ width: "100%", maxWidth: "150px" }}
                    />
                  </Box>
                )}
              </>
            );
          })()}
        </Box>
      )}

      {/* Use the ScanModal component */}
      <ScanModal open={scanning} onClose={cancelScanning} videoRef={videoRef} />

      {!scanning && (
        <Button variant="contained" color="primary" onClick={startScanning} sx={{ mt: 2 }}>
          {barcode ? 'Scan Again' : 'Start Scanning'}
        </Button>
      )}
    </Container>
  );
};

export default CheckGrocery;
