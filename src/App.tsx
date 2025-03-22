import React, { useState, useEffect } from 'react';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { db } from './firebase';

interface DocData extends DocumentData {
  id: string;
}

const App: React.FC = () => {
  const [docsData, setDocsData] = useState<DocData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Replace 'yourCollection' with your actual collection name
        const querySnapshot = await getDocs(collection(db, 'example'));
        const docs: DocData[] = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setDocsData(docs);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Documents Data</h1>
      <pre>{JSON.stringify(docsData, null, 2)}</pre>
    </div>
  );
}

export default App;