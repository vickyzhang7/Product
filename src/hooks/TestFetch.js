import React, { useState, useEffect } from 'react';

export default function TestFetch() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch('http://localhost:3000/recipes', { signal });
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const data = await res.json();

        setIsPending(false);
        setData(data);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch was aborted');
        } else {
          setIsPending(false);
          setError('Could not fetch the data');
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {data && data.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  );
}
