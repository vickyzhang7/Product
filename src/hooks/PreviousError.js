import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          console.error('Fetch error:', err);
          setError("Could not fetch data");
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    // Cleanup function to abort the fetch operation if the component unmounts
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, [url]); // Depend on URL to re-run the effect when it changes

  return { data, isPending, error };
};
