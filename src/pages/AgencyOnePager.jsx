import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

const GradientDivider = () => (
  <div style={{ height: '2px', background: 'linear-gradient(to right, #3b82f6, #14b8a6, #f59e0b)', width: '100%' }} />
);

export default function AgencyOnePager() {
  const { t } = useTranslation();

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4', { compress: true });
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('travel-partner-one-pager.pdf');
  };

  const steps = [
    { num: "01", title: t('agencyonepager.step1_title'), desc: t('agencyonepager.step1_desc') },
    { num: "02", title: t('agencyonepager.step2_title'), desc: t('agencyonepager.step2_desc') },
    { num: "03", title: t('agencyonepager.step3_title'), desc: t('agencyonepager.step3_desc') },
    { num: "04", title: t('agencyonepager.step4_title'), desc: t('agencyonepager.step4_desc') },
  ];

  const why = [
    { title: t('agencyonepager.why1_title'), desc: t('agencyonepager.why1_desc') },
    { title: t('agencyonepager.why2_title'), desc: t('agencyonepager.why2_desc') },
    { title: t('agencyonepager.why3_title'), desc: t('agencyonepager.why3_desc') },
    { title: t('agencyonepager.why4_title'), desc: t('agencyonepager.why4_desc') },
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 50%, hsl(216 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/agency-showcase">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </button>
        </Link>
        <LanguageSwitcher />
        <Button onClick={handleDownloadPDF} className="gap-2" style={{ background: 'linear-gradient(to right, #3b82f6, #14b8a6)' }}>
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      {/* A4 content */}
      <div
        className="print-content max-w-[794px] mx-auto px-8 py-6 print:py-0 print:px-0 bg-white flex flex-col"
        style={{ minHeight: '1122px', maxHeight: '1122px', overflow: 'hidden' }}
      >
        {/* Header */}
        <div className="text-center pb-2">
          <DutyBoostLogo height={110} />
        </div>
        <GradientDivider />

        <div className="flex-1 flex flex-col justify-between">

          {/* Headline */}
          <div className="text-center py-3">
            <h1 className="text-lg font-heading font-bold leading-tight">{t('agencyonepager.headline')}</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">
              {t('agencyonepager.subtitle')}
            </p>
          </div>

          {/* Section 1 */}
          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#1d4ed8' }}>{t('agencyonepager.s1_title')}</h2>
            <div className="mb-2"><GradientDivider /></div>
            <div className="grid grid-cols-2 gap-2">
              {why.map(c => (
                <div key={c.title} className="bg-slate-50 rounded p-3 border border-border">
                  <p className="font-semibold text-xs mb-0.5">{c.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#0f766e' }}>{t('agencyonepager.s2_title')}</h2>
            <div className="mb-2"><GradientDivider /></div>
            <div className="grid grid-cols-4 gap-2">
              {steps.map(s => (
                <div key={s.num} className="bg-teal-50 rounded p-3 border border-teal-100">
                  <p className="text-lg font-heading font-bold text-teal-300 leading-none">{s.num}</p>
                  <p className="font-semibold text-xs text-teal-800 mt-1">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div className="py-2 mt-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#b45309' }}>{t('agencyonepager.s3_title')}</h2>
            <div className="mb-2"><GradientDivider /></div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#3b82f6' }}>{t('agencyonepager.stat1_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{t('agencyonepager.stat1_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">{t('agencyonepager.stat1_desc')}</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#14b8a6' }}>{t('agencyonepager.stat2_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{t('agencyonepager.stat2_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">{t('agencyonepager.stat2_desc')}</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#f59e0b' }}>{t('agencyonepager.stat3_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{t('agencyonepager.stat3_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">{t('agencyonepager.stat3_desc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">{t('agencyonepager.benefit1_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t('agencyonepager.benefit1_desc')}</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">{t('agencyonepager.benefit2_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t('agencyonepager.benefit2_desc')}</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">{t('agencyonepager.benefit3_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t('agencyonepager.benefit3_desc')}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <GradientDivider />
            <div className="text-center py-4">
              <p className="font-heading font-bold text-sm">{t('agencyonepager.cta')}</p>
              <div className="flex items-center justify-center gap-6 mt-0.5">
                <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 transition-colors">dutyboost.com</a>
                <a href="mailto:rael@dutyboost.com" className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 transition-colors">rael@dutyboost.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal footer */}
        <div className="text-center pb-1">
          <p className="text-xs text-muted-foreground">{t('agencyonepager.legal')}</p>
        </div>

      </div>
    </div>
  );
}