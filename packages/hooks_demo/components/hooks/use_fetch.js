import { useState, useEffect } from 'react';
 

export const useFetch = (url) => {
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async (url) => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    setData(data);
  }
  
  useEffect(() => {
    fetchData(url);
  }, [url]);

  return { loading, data };

}