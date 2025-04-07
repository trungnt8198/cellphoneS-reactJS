import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    if (!value) return;
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);
  return debouncedValue;
};

export default useDebounce;
