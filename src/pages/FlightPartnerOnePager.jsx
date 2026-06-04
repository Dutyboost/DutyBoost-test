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

export default function FlightPartnerOnePager() {
  const { t } = useTranslation();
  const p = (k) => t(`flightonepager.${k}`);

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4', { compress: true });
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('flight-partner-one-pager.pdf');
  };

  const steps = [
    { num: "01", title: p('step1_title'), desc: p('step1_desc') },
    { num: "02", title: p('step2_title'), desc: p('step2_desc') },
    { num: "03", title: p('step3_title'), desc: p('step3_desc') },
    { num: "04", title: p('step4_title'), desc: p('step4_desc') },
  ];

  const why = [
    { title: p('why1_title'), desc: p('why1_desc') },
    { title: p('why2_title'), desc: p('why2_desc') },
    { title: p('why3_title'), desc: p('why3_desc') },
    { title: p('why4_title'), desc: p('why4_desc') },
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 50%, hsl(216 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </button>
        </Link>
        <LanguageSwitcher />
        <Button onClick={handleDownloadPDF} className="gap-2" style={{ background: 'linear-gradient(to right, #3b82f6, #14b8a6)' }}>
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      <div
        className="print-content max-w-[794px] mx-auto px-8 py-3 print:py-0 print:px-0 bg-white flex flex-col"
        style={{ minHeight: '1122px', maxHeight: '1122px', overflow: 'hidden' }}
      >
        <div className="flex items-center justify-between pb-1">
          <DutyBoostLogo height={40} />
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">{p('badge')}</span>
        </div>
        <GradientDivider />

        <div className="flex-1 flex flex-col justify-between">
          <div className="text-center py-2">
            <h1 className="text-base font-heading font-bold leading-tight">{p('headline')}</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">{p('subtitle')}</p>
          </div>

          <div className="py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: '#1d4ed8' }}>{p('s1_title')}</h2>
            <div className="mb-1"><GradientDivider /></div>
            <div className="grid grid-cols-2 gap-1.5">
              {why.map(c => (
                <div key={c.title} className="bg-slate-50 rounded p-2 border border-border">
                  <p className="font-semibold text-xs mb-0.5">{c.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: '#0f766e' }}>{p('s2_title')}</h2>
            <div className="mb-1"><GradientDivider /></div>
            <div className="grid grid-cols-4 gap-1.5">
              {steps.map(s => (
                <div key={s.num} className="bg-teal-50 rounded p-2 border border-teal-100">
                  <p className="text-base font-heading font-bold text-teal-300 leading-none">{s.num}</p>
                  <p className="font-semibold text-xs text-teal-800 mt-0.5">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: '#b45309' }}>{p('s3_title')}</h2>
            <div className="mb-1"><GradientDivider /></div>
            <div className="grid grid-cols-3 gap-1.5 mb-1.5">
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold leading-tight" style={{ color: '#3b82f6' }}>{p('stat1_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{p('stat1_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{p('stat1_desc')}</p>
              </div>
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold leading-tight" style={{ color: '#14b8a6' }}>{p('stat2_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{p('stat2_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{p('stat2_desc')}</p>
              </div>
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold leading-tight" style={{ color: '#f59e0b' }}>{p('stat3_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{p('stat3_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{p('stat3_desc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs mb-0.5">{p('benefit1_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{p('benefit1_desc')}</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs mb-0.5">{p('benefit2_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{p('benefit2_desc')}</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs mb-0.5">{p('benefit3_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{p('benefit3_desc')}</p>
              </div>
            </div>
          </div>

          <div>
            <GradientDivider />
            <div className="text-center py-2">
              <p className="font-heading font-bold text-xs">{p('cta')}</p>
              <div className="flex items-center justify-center gap-6 mt-0.5">
                <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-700 underline underline-offset-2">dutyboost.com</a>
                <a href="mailto:hello@dutyboost.com" className="text-xs font-semibold text-blue-700 underline underline-offset-2">hello@dutyboost.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-1">
          <p className="text-xs text-muted-foreground">{p('legal')}</p>
        </div>
      </div>
    </div>
  );
}