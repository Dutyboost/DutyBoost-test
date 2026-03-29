import { useEffect, useRef } from "react";

export default function QRCodeDisplay({ value, size = 200 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const s = size;
    canvas.width = s;
    canvas.height = s;

    // Simple QR-like visual (not a real QR encoder — placeholder visual)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, s, s);
    
    const modules = 21;
    const moduleSize = Math.floor(s / (modules + 2));
    const offset = Math.floor((s - modules * moduleSize) / 2);

    // Generate deterministic pattern from value
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    }

    ctx.fillStyle = "#1a1a2e";
    
    // Draw finder patterns
    const drawFinder = (x, y) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          if (isBorder || isInner) {
            ctx.fillRect(offset + (x + c) * moduleSize, offset + (y + r) * moduleSize, moduleSize, moduleSize);
          }
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(modules - 7, 0);
    drawFinder(0, modules - 7);

    // Fill data area with seeded pattern
    let seed = Math.abs(hash);
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        const inFinder = (r < 8 && c < 8) || (r < 8 && c > modules - 9) || (r > modules - 9 && c < 8);
        if (inFinder) continue;
        seed = (seed * 16807 + 0) % 2147483647;
        if (seed % 3 === 0) {
          ctx.fillRect(offset + c * moduleSize, offset + r * moduleSize, moduleSize, moduleSize);
        }
      }
    }
  }, [value, size]);

  return (
    <div className="inline-flex items-center justify-center p-4 bg-white rounded-xl shadow-inner">
      <canvas ref={canvasRef} className="rounded" />
    </div>
  );
}