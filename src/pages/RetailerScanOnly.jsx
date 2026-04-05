import { useState, useRef, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Check, X, AlertCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import jsQR from "jsqr";

export default function RetailerScanOnly() {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!scanning || !videoRef.current) return;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        scanQR();
      })
      .catch(() => setMessage("Camera access denied"));
  }, [scanning]);

  const scanQR = () => {
    if (!videoRef.current || !scanning) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      handleVoucherCode(code.data);
    } else {
      setTimeout(scanQR, 500);
    }
  };

  const handleVoucherCode = async (code) => {
    setScanning(false);
    setLoading(true);

    try {
      const vouchers = await base44.entities.Voucher.filter({ voucher_code: code });
      if (vouchers.length === 0) {
        setResult("invalid");
        setMessage("Voucher not found");
      } else {
        const v = vouchers[0];
        if (v.status !== "active") {
          setResult("invalid");
          setMessage(`Voucher is ${v.status}`);
        } else {
          setResult("redeemed");
          setMessage(`${v.discount_percentage}% discount — €${(v.ticket_price * v.discount_percentage / 100).toFixed(2)}`);
          await base44.entities.Voucher.update(v.id, { status: "redeemed" });
        }
      }
    } catch (err) {
      setResult("invalid");
      setMessage("Error reading voucher");
    }
    setLoading(false);
  };

  const resetScan = () => {
    setResult(null);
    setMessage("");
    setScanning(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between sticky top-0 bg-card/80 backdrop-blur">
        <DutyBoostLogo height={100} />
        <p className="text-xs text-muted-foreground font-medium">Scan Mode</p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-md mx-auto w-full">
        {scanning && !result ? (
          <>
            <div className="relative w-full max-w-xs mb-6">
              <video
                ref={videoRef}
                className="w-full rounded-2xl border-2 border-primary/30 bg-black aspect-square object-cover"
                autoPlay
                playsInline
              />
              <div className="absolute inset-0 rounded-2xl pointer-events-none">
                <div className="absolute inset-4 border-2 border-primary opacity-50 rounded-lg" />
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Camera className="w-4 h-4 animate-pulse" />
              <p className="text-sm font-medium">Point at QR code</p>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </>
        ) : result === "redeemed" ? (
          <>
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-green-600 mb-2">Redeemed!</h2>
            <p className="text-center text-muted-foreground mb-6">{message}</p>
            <Button onClick={resetScan} className="w-full gap-2">
              <Camera className="w-4 h-4" /> Scan Next
            </Button>
          </>
        ) : (
          <>
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <X className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-red-600 mb-2">Invalid</h2>
            <p className="text-center text-muted-foreground mb-6">{message}</p>
            <Button onClick={resetScan} className="w-full gap-2">
              <Camera className="w-4 h-4" /> Scan Again
            </Button>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4 text-center text-xs text-muted-foreground">
        DutyBoost Scan Mode
      </div>
    </div>
  );
}