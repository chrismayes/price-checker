import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Quagga from '@ericblade/quagga2';
import ScanModal from '../modals/ScanModal';
import { apiFetch } from '../apiFetch';

const CheckGrocery: React.FC = () => {
  const videoRef = useRef<HTMLDivElement>(null); // Reference to the video container for barcode scanning
  const [barcode, setBarcode] = useState<string>('');
  const [readerType, setReaderType] = useState<string>('');
  const [scanning, setScanning] = useState(false); // State to track if scanning is active
  const [productData, setProductData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const quaggaStarted = useRef(false);
  const hasDetected = useRef(false);

  // Initialize Quagga2 and attach it to the video container
  const initQuagga = useCallback(() => {
    if (videoRef.current) {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: videoRef.current,
            constraints: {
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: 'environment', // Use the rear camera
            },
          },
          decoder: {
            readers: ['upc_reader', 'ean_reader'], // Supported barcode formats
          },
        },
        (err) => {
          if (err) {
            console.error('Quagga2 init error:', err);
            return;
          }
          quaggaStarted.current = true;
          Quagga.start();
          setTimeout(() => {
            const videoElem = videoRef.current?.querySelector('video');
            if (videoElem) {
              videoElem.setAttribute('playsinline', 'true'); // Ensure the video plays inline
              videoElem.setAttribute('muted', 'true'); // Mute the video
            }
          }, 500);
        }
      );

      // Handle barcode detection
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
          setBarcode(detectedCode);
          setReaderType(friendlyReader);
          hasDetected.current = true;
          Quagga.stop();
          setScanning(false);
          fetchProductData(detectedCode); // Fetch product data using the detected barcode
        }
      });
    } else {
      console.error('Video ref is not defined');
    }
  }, []);

  const startScanning = () => {
    setBarcode('');
    setReaderType('');
    setProductData(null);
    setError('');
    hasDetected.current = false;
    setScanning(true);
  };

  const cancelScanning = () => {
    if (quaggaStarted.current) {
      try {
        Quagga.stop();
      } catch (err) {
        console.warn('Error stopping Quagga2:', err);
      }
    }
    setScanning(false);
    hasDetected.current = false;
    quaggaStarted.current = false;
  };

  // Fetch product data from the API using the barcode
  const fetchProductData = async (barcodeValue: string) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const data = await apiFetch(`${apiUrl}/api/product-from-barcode/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barcode_number: barcodeValue }),
      });
      setProductData(data);
    } catch (err: any) {
      console.error('Error fetching product data:', err);
      setError('Error fetching product data');
    }
  };

  useEffect(() => {
    if (scanning) { initQuagga() }
    return () => {
      if (quaggaStarted.current) {
        try {
          Quagga.stop();
        } catch (err) {
          console.warn('Error stopping Quagga2 during cleanup:', err);
        }
      }
      Quagga.offDetected(); // Remove the detection listener
    };
  }, [scanning, initQuagga]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>Check a Grocery</Typography>
      {barcode && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5">Detected Barcode: {barcode}</Typography>
          {readerType && (
            <Typography variant="body1">Reader Type: {readerType}</Typography>
          )}
        </Box>
      )}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>{error}</Typography>
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
                    <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>${walmartStore.price}</span>
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
