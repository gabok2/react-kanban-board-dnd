import { useState, useEffect } from "react";

interface WindowDimensions {
  width: number;
  height: number;
  isLoaded?: boolean;
}

function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    {} as WindowDimensions
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsLoaded(true);
    }

    handleResize(); // chamar a função imediatamente para definir as dimensões iniciais

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { ...windowDimensions, isLoaded };
}

export default useWindowDimensions;
