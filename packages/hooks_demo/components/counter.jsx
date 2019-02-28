import React, { useCallback } from 'react';
import useCounter from './hooks/use_counter';

export default function Counter(props) {

  const {
    count: countProp = 65
  } = props;

  const [count, prevCount, setCount] = useCounter(countProp);
  
  return (
    <>
      <div>{count}</div>
      <div>{`previous count ${prevCount ? prevCount : 'N/A'}`}</div>
      <button onClick={useCallback(() => setCount(count + 1), [count])}>increment</button>
    </>
  )

}