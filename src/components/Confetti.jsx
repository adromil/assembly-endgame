import { useEffect, useRef } from "react";
import { fireConfetti } from "../utils/confetti.js";

export default function Confetti({ trigger }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!trigger) return undefined;
    return fireConfetti(canvasRef.current);
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="confetti"
    />
  );
}
