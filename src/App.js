import './App.css';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [docData, setDocData] = useState(null);

  useEffect(() => {
    const docRef = doc(db, 'example', 'lC4cVAQgvWO68NALqfQ0');
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setDocData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });
  }, []);

  return (
    <div>
      <h1>Document Data</h1>
      {docData ? (
        // Display the document data as formatted JSON
        <pre>{JSON.stringify(docData, null, 2)}</pre>
      ) : (
        <p>Loading document...</p>
      )}
    </div>
  );
}

export default App;
