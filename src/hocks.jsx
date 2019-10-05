import { useEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handler = e => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return size;
}
