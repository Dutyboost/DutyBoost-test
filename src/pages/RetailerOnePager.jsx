import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function RetailerOnePager() {
  const { t } = useTranslation();

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4', { compress: true });
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 297;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }
    pdf.save('retailer-one-pager.pdf');
  };

  const steps = [
    { num: "01", title: t('retaileronepager.step1_title'), desc: t('retaileronepager.step1_desc') },
    { num: "02", title: t('retaileronepager.step2_title'), desc: t('retaileronepager.step2_desc') },
    { num: "03", title: t('retaileronepager.step3_title'), desc: t('retaileronepager.step3_desc') },
    { num: "04", title: t('retaileronepager.step4_title'), desc: t('retaileronepager.step4_desc') },
  ];

  const why = [
    { title: t('retaileronepager.why1_title'), desc: t('retaileronepager.why1_desc') },
    { title: t('retaileronepager.why2_title'), desc: t('retaileronepager.why2_desc') },
    { title: t('retaileronepager.why3_title'), desc: t('retaileronepager.why3_desc') },
    { title: t('retaileronepager.why4_title'), desc: t('retaileronepager.why4_desc') },
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 25%, hsl(216 45% 96%) 50%, hsl(220 40% 97%) 75%, hsl(216 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/retailer-showcase">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </button>
        </Link>
        <LanguageSwitcher />
        <Button onClick={handleDownloadPDF} className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      {/* A4-style content */}
      <div className="print-content max-w-[794px] mx-auto px-8 py-2 print:py-0 print:px-0 bg-white flex flex-col" style={{ minHeight: '1122px' }}>

        {/* Header */}
        <div className="text-center border-b-2 border-orange-500 pb-1">
          <DutyBoostLogo height={200} />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-6">

          {/* HEADLINE SECTION */}
          <div className="text-center space-y-0.5">
            <h1 className="text-2xl font-heading font-bold leading-tight">{t('retaileronepager.headline')}</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto">
              {t('retaileronepager.subtitle')}
            </p>
          </div>

          {/* SECTION 1: WHY IT MATTERS */}
          <div className="space-y-1.5">
            <h2 className="font-heading font-bold text-xs border-b-2 border-orange-500 pb-1 text-orange-700 uppercase tracking-wide">{t('retaileronepager.s1_title')}</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {why.map(c => (
                <div key={c.title} className="bg-slate-50 rounded p-3 border border-border">
                  <p className="font-semibold text-xs">{c.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: HOW IT WORKS */}
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-xs border-b-2 border-orange-500 pb-1 text-orange-700 uppercase tracking-wide">{t('retaileronepager.s2_title')}</h2>
            <div className="grid grid-cols-4 gap-2">
              {steps.map(s => (
                <div key={s.num} className="bg-orange-50 rounded p-2 border border-orange-100">
                  <p className="text-lg font-heading font-bold text-orange-300 leading-none">{s.num}</p>
                  <p className="font-semibold text-xs text-orange-800 mt-0.5">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: WHAT IT BRINGS */}
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-xs border-b-2 border-orange-500 pb-1 text-orange-700 uppercase tracking-wide">{t('retaileronepager.s3_title')}</h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold text-orange-700 leading-tight">{t('retaileronepager.stat1_value')}</p>
                <p className="font-semibold text-xs">{t('retaileronepager.stat1_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.stat1_desc')}</p>
              </div>
              <div className="border border-border rounded p-2 text-center">
                <div className="flex justify-center mb-1">
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline
                      points="5,80 30,35 50,55 75,20 90,10"
                      stroke="#16a34a"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <polyline
                      points="76,5 90,10 85,24"
                      stroke="#16a34a"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-xs">{t('retaileronepager.stat2_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.stat2_desc')}</p>
              </div>
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold text-orange-700 leading-tight">{t('retaileronepager.stat3_value')}</p>
                <p className="font-semibold text-xs">{t('retaileronepager.stat3_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.stat3_desc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs">{t('retaileronepager.benefit1_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.benefit1_desc')}</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs">{t('retaileronepager.benefit2_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.benefit2_desc')}</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs">{t('retaileronepager.benefit3_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.benefit3_desc')}</p>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="border-t-2 border-orange-500 pt-2 text-center space-y-1">
            <p className="font-heading font-bold text-sm">{t('retaileronepager.cta')}</p>
            <div className="flex items-center justify-center gap-6">
              <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800 transition-colors">dutyboost.com</a>
            </div>
          </div>

        </div>

        {/* Legal footer */}
        <div className="text-center pb-2 pt-1">
          <p className="text-xs text-muted-foreground">{t('retaileronepager.legal')}</p>
        </div>

      </div>
    </div>
  );
}