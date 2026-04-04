import { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import jsQR from "jsqr";

export default function RetailerScanQR() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!scanning) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setResult({ error: "Camera access denied. Please enable camera permissions." });
        setScanning(false);
      }
    };

    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [scanning]);

  useEffect(() => {
    if (!scanning) return;

    const scanInterval = setInterval(async () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setScanning(false);
        setLoading(true);

        try {
          const vouchers = await base44.entities.Voucher.filter({
            voucher_code: code.data,
          });

          if (vouchers.length > 0) {
            const voucher = vouchers[0];
            if (voucher.status === "active") {
              await base44.entities.Voucher.update(voucher.id, {
                status: "redeemed",
              });
              setResult({
                success: true,
                voucher: voucher,
                message: `DutyCredit redeemed successfully! Discount: ${voucher.discount_percentage}%`,
              });
            } else {
              setResult({
                error: `DutyCredit already ${voucher.status}`,
              });
            }
          } else {
            setResult({ error: "Invalid QR code. No matching DutyCredit found." });
          }
        } catch (err) {
          setResult({ error: "Error validating DutyCredit. Please try again." });
        } finally {
          setLoading(false);
        }
      }
    }, 500);

    return () => clearInterval(scanInterval);
  }, [scanning]);

  const resetScan = () => {
    setResult(null);
    setScanning(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {scanning && !result && (
          <div className="space-y-4">
            <h1 className="text-3xl font-heading font-bold text-center">Scan DutyCredit</h1>
            <p className="text-center text-muted-foreground">Point your camera at the QR code</p>

            <div className="relative bg-black rounded-2xl overflow-hidden aspect-square border-4 border-primary">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="absolute inset-0 border-4 border-primary/30">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-primary rounded-lg" />
              </div>

              {loading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white border-t-primary rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {result.success ? (
              <Card className="bg-green-50 border-green-200 p-6 space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-center text-green-900">
                  Success!
                </h2>
                <p className="text-center text-green-800 font-medium">
                  {result.message}
                </p>
                {result.voucher && (
                  <div className="bg-white rounded-lg p-3 space-y-1 text-sm">
                    <p><strong>Code:</strong> {result.voucher.voucher_code}</p>
                    <p><strong>Airport:</strong> {result.voucher.airport}</p>
                    <p><strong>Discount:</strong> {result.voucher.discount_percentage}%</p>
                  </div>
                )}
                <Button onClick={resetScan} className="w-full bg-green-600 hover:bg-green-700">
                  Scan Another
                </Button>
              </Card>
            ) : (
              <Card className="bg-red-50 border-red-200 p-6 space-y-4">
                <div className="flex justify-center">
                  <AlertCircle className="w-16 h-16 text-red-600" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-center text-red-900">
                  Invalid Code
                </h2>
                <p className="text-center text-red-800">
                  {result.error}
                </p>
                <Button onClick={resetScan} className="w-full bg-red-600 hover:bg-red-700">
                  Try Again
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}