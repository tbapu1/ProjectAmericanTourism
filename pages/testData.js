// pages/testData.js
import { useEffect, useState } from 'react';

function TestData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/testData');
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Data from PostgreSQL</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default TestData;
