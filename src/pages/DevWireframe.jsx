import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GUIDE_CONTENT } from "@/data/devGuideContent";

export default function DevWireframe() {
  const handleDownload = () => {
    const blob = new Blob([GUIDE_CONTENT], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DutyBoost_Full_Stack_Development_Wireframe_v2.0.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-heading font-bold text-foreground">DutyBoost — Developer Wireframe</h1>
            <p className="text-xs text-muted-foreground">Full Stack Migration Guide v2.0</p>
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Download Guide
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <span className="text-slate-400 text-xs font-mono">DutyBoost_Full_Stack_Development_Wireframe_v2.0.txt</span>
          </div>
          <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap bg-slate-950 text-slate-100">
            {GUIDE_CONTENT}
          </pre>
        </div>

        <div className="mt-6 flex justify-center">
          <Button size="lg" onClick={handleDownload} className="gap-2">
            <Download className="w-5 h-5" />
            Download Full Development Guide
          </Button>
        </div>
      </div>
    </div>
  );
}