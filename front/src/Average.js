import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Average() {

  const pair = 'ETH-USD';
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:3000/average/' + pair);
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>Average price of {pair} :</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default Average;
