"use client";
import { useEffect, useState } from "react";

interface LayoutSizeChangedParams {
  widthDifference?: number;
  heightDifference?: number;
}
interface WindowLayoutProperties {
  width: number;
  height: number;
}
export function useLayoutSize({
  widthDifference = 0,
  heightDifference = 0,
}: LayoutSizeChangedParams): WindowLayoutProperties {
  const [state, setState] = useState<WindowLayoutProperties>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setState({
      width: window.innerWidth - widthDifference,
      height: window.innerHeight - heightDifference,
    });
    function handleSizeChange(e: UIEvent): any {
      setState({
        width: window.innerWidth - widthDifference,
        height: window.innerHeight - heightDifference,
      });
    }

    window.addEventListener("resize", handleSizeChange);
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, []);

  return state;
}
