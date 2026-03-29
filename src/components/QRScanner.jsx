import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { Camera, X, Flashlight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QRScanner({ onScan, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        rafRef.current = requestAnimationFrame(tick);
      }
    } catch (err) {
      setError("Camera access denied. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
  };

  const tick = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (code) {
      setScanning(false);
      stopCamera();
      onScan(code.data);
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          <span className="font-medium">Scan Voucher QR Code</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        {error ? (
          <div className="text-center text-white p-6">
            <Camera className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm opacity-70">{error}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />
            {/* Scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 border-2 border-white/30 rounded-2xl" />
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                {scanning && (
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-primary animate-bounce" style={{ animation: "scan 2s ease-in-out infinite" }} />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-6 text-center text-white/60 text-sm">
        Point your camera at the voucher QR code
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: calc(100% - 2px); }
        }
      `}</style>
    </div>
  );
}