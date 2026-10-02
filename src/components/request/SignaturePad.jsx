import { useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Eraser } from "lucide-react";

const W = 600;
const H = 180;

/**
 * Lightweight canvas signature pad — no external library. Draws with mouse,
 * touch or stylus and reports a trimmed PNG data URL so the signature can be
 * placed directly on the downloaded PDF.
 */
export default function SignaturePad({ label, value, onChange, clearLabel = "Clear", hint }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0A1F44";
  }, []);

  const pos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * W,
      y: ((e.clientY - rect.top) / rect.height) * H,
    };
  };

  const start = (e) => {
    e.preventDefault();
    drawing.current = true;
    last.current = pos(e);
  };

  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };

  // Crop to the inked area so the signature fills the space on the document.
  const exportTrimmed = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const data = ctx.getImageData(0, 0, W, H).data;
    let minX = W, minY = H, maxX = 0, maxY = 0, found = false;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (data[(y * W + x) * 4 + 3] > 0) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (!found) return "";
    const pad = 10;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(W - 1, maxX + pad);
    maxY = Math.min(H - 1, maxY + pad);
    const cw = maxX - minX + 1;
    const ch = maxY - minY + 1;
    const out = document.createElement("canvas");
    out.width = cw;
    out.height = ch;
    out.getContext("2d").drawImage(canvas, minX, minY, cw, ch, 0, 0, cw, ch);
    return out.toDataURL("image/png");
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    onChange?.(exportTrimmed());
  };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, W, H);
    onChange?.("");
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Eraser className="w-3.5 h-3.5" /> {clearLabel}
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
        className="w-full h-32 touch-none rounded-md border border-input bg-white cursor-crosshair"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {value ? (
        <p className="text-xs text-emerald-600">Signature captured.</p>
      ) : null}
    </div>
  );
}