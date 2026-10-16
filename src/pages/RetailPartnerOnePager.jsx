import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CurrencyProvider } from "@/components/calculator/CurrencyContext";
import RetailPartnerOnePagerSheet from "@/components/onepager/RetailPartnerOnePagerSheet";

export default function RetailPartnerOnePager() {
  const { t } = useTranslation();

  const handleDownloadPDF = async () => {
    const element = document.querySelector(".print-content");
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF("p", "mm", "a4", { compress: true });
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("retail-partner-one-pager.pdf");
  };

  return (
    <CurrencyProvider>
      <div
        className="min-h-screen font-body"
        style={{ background: "linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 50%, hsl(216 55% 96%) 100%)", backgroundAttachment: "fixed" }}
      >
        <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-end">
          <Button onClick={handleDownloadPDF} className="gap-2" style={{ background: "linear-gradient(to right, #1f69ff, #14b8a6)" }}>
            <Printer className="w-4 h-4" /> {t("common.download")}
          </Button>
        </div>

        <RetailPartnerOnePagerSheet />
      </div>
    </CurrencyProvider>
  );
}