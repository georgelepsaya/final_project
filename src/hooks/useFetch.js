import { useState, useEffect } from "react";

export const useFetch = ({ url }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) => res.json())
        .then((json) => setData(json));
    }
  }, [url]);
  return {
    data,
  };
};
