import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    if (!value) return;
    const timer = setTimeout(() => {
      setInputValue(inputValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, delay, value]);
  return value;
};

export default useDebounce;
