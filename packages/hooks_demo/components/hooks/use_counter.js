import { useState, useRef, useEffect } from 'react';

export default function useCounter(currentCount){
  const [count, setCount] = useState(currentCount);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count; 
  }, [count]);

  return [count, prevCountRef.current, setCount]
}