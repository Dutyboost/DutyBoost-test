import { useRef, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Eraser, PenLine, Type } from "lucide-react";

const W = 600;
const H = 180;
const SIGNATURE_FONT = "'Dancing Script', 'Segoe Script', 'Brush Script MT', cursive";

/**
 * Lightweight canvas signature pad — no external library. The signer can either
 * draw with mouse, touch or stylus, or type their name (rendered in a handwriting
 * font). Both produce a trimmed PNG data URL so the signature can be placed
 * directly on the downloaded PDF.
 */
export default function SignaturePad({
  label,
  value,
  onChange,
  clearLabel = "Clear",
  hint,
  drawLabel = "Draw",
  typeLabel = "Type",
  typePlaceholder = "Type your full name",
}) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState("draw");
  const [typed, setTyped] = useState("");

  const ctx2d = () => canvasRef.current?.getContext("2d") || null;

  useEffect(() => {
    const ctx = ctx2d();
    if (!ctx) return;
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
    const ctx = ctx2d();
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

  // Render the typed name in a handwriting font, scaled to fit the pad.
  const drawTyped = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0A1F44";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const name = (text || "").trim();
    if (!name) {
      onChange?.("");
      return;
    }
    let size = 92;
    ctx.font = `${size}px ${SIGNATURE_FONT}`;
    while (ctx.measureText(name).width > W - 60 && size > 24) {
      size -= 4;
      ctx.font = `${size}px ${SIGNATURE_FONT}`;
    }
    ctx.fillText(name, W / 2, H / 2);
    onChange?.(exportTrimmed());
  };

  // Redraw the typed name once the handwriting font is available.
  useEffect(() => {
    if (mode !== "type") return;
    const redraw = () => drawTyped(typed);
    if (document.fonts?.ready) document.fonts.ready.then(redraw);
    else redraw();
  }, [mode]);

  const handleTyped = (e) => {
    setTyped(e.target.value);
    drawTyped(e.target.value);
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    onChange?.(exportTrimmed());
  };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, W, H);
    setTyped("");
    onChange?.("");
  };

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, W, H);
    onChange?.("");
    if (next === "type") setTyped("");
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Label>{label}</Label>
        <div className="flex items-center gap-1">
          <div className="inline-flex rounded-md border border-input overflow-hidden">
            <button
              type="button"
              onClick={() => switchMode("draw")}
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 transition-colors ${
                mode === "draw" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <PenLine className="w-3.5 h-3.5" /> {drawLabel}
            </button>
            <button
              type="button"
              onClick={() => switchMode("type")}
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 transition-colors ${
                mode === "type" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Type className="w-3.5 h-3.5" /> {typeLabel}
            </button>
          </div>
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-1"
          >
            <Eraser className="w-3.5 h-3.5" /> {clearLabel}
          </button>
        </div>
      </div>

      {mode === "type" && (
        <input
          type="text"
          value={typed}
          onChange={handleTyped}
          placeholder={typePlaceholder}
          autoComplete="off"
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
        />
      )}

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onPointerDown={mode === "draw" ? start : undefined}
        onPointerMove={mode === "draw" ? move : undefined}
        onPointerUp={mode === "draw" ? end : undefined}
        onPointerLeave={mode === "draw" ? end : undefined}
        onPointerCancel={mode === "draw" ? end : undefined}
        className={`w-full h-32 rounded-md border border-input bg-white ${
          mode === "draw" ? "touch-none cursor-crosshair" : "cursor-default"
        }`}
      />

      {mode === "draw" && hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {value ? <p className="text-xs text-emerald-600">Signature captured.</p> : null}
    </div>
  );
}