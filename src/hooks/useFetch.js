import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        console.log("Content-Type:", contentType);

        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await res.json();
          setData(data);
        } else {
          const text = await res.text();
          console.log("Received content:", text);
          throw new Error("Received content is not JSON");
        }

        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          console.error('Fetch error:', err);
          setIsPending(false);
          setError('Could not fetch the data');
        }
      }
    };

    fetchData();

    return () => {
      console.log("Component will unmount, aborting fetch");
      controller.abort();
      console.log("Fetch aborted");
    };
  }, [url]);

  return { data, isPending, error };
};
