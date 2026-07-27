import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import OnePagerLogo from "../components/OnePagerLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function PosPartnerOnePager() {
  const { t, i18n } = useTranslation();
  const p = (k) => t(`pospartneronepager.${k}`);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const naturalHeight = innerRef.current.scrollHeight;
    setScale(naturalHeight > 1122 ? 1122 / naturalHeight : 1);
  }, [i18n.language]);

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
    pdf.save('pos-partner-one-pager.pdf');
  };

  const steps = [
    { num: "01", title: p('step1_title'), desc: p('step1_desc') },
    { num: "02", title: p('step2_title'), desc: p('step2_desc') },
    { num: "03", title: p('step3_title'), desc: p('step3_desc') },
    { num: "04", title: p('step4_title'), desc: p('step4_desc') },
  ];

  const why = [
    { num: 1, title: p('why1_title'), desc: p('why1_desc') },
    { num: 2, title: p('why2_title'), desc: p('why2_desc') },
    { num: 3, title: p('why3_title'), desc: p('why3_desc') },
    { num: 4, title: p('why4_title'), desc: p('why4_desc') },
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(255 60% 97%) 0%, hsl(243 50% 96%) 50%, hsl(255 55% 97%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/pos-partner">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </button>
        </Link>
        <LanguageSwitcher allowedLanguages={["en", "fr", "de"]} />
        <Button onClick={handleDownloadPDF} className="gap-2 text-white" style={{ background: 'linear-gradient(to right, #7c3aed, #6366f1)' }}>
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      {/* A4-style content */}
      <div className="print-content max-w-[794px] mx-auto bg-white" style={{ width: '794px', height: '1122px', overflow: 'hidden' }}>
      <div ref={innerRef} className="px-8 py-2 flex flex-col" style={{ width: '794px', minHeight: '1122px', transformOrigin: 'top center', transform: `scale(${scale})` }}>

        {/* Header */}
        <div className="flex items-center justify-between border-b-2 pb-1" style={{ borderColor: '#7c3aed' }}>
          <OnePagerLogo height={36} />
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'hsl(255 90% 95%)', color: '#6d28d9' }}>
            {p('badge')}
          </span>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col justify-between">

          {/* HEADLINE SECTION */}
          <div className="text-center py-1">
            <h1 className="text-xl font-heading font-bold leading-tight">{p('headline')}</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">
              {p('subtitle')}
            </p>
          </div>

          {/* SECTION 1: WHY IT MATTERS */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs border-b-2 pb-0.5 uppercase tracking-wide mb-1" style={{ borderColor: '#7c3aed', color: '#6d28d9' }}>{p('s1_title')}</h2>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {why.map(c => (
                <div key={c.title} className="bg-slate-50 rounded p-2 border border-border">
                  <p className="font-semibold text-xs"><span style={{ color: '#7c3aed', marginRight: '4px' }}>{c.num}.</span>{c.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: HOW IT WORKS */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs border-b-2 pb-0.5 uppercase tracking-wide mb-1" style={{ borderColor: '#7c3aed', color: '#6d28d9' }}>{p('s2_title')}</h2>
            <div className="grid grid-cols-4 gap-1.5 flex-1">
              {steps.map(s => (
                <div key={s.num} className="rounded p-2 border" style={{ background: 'hsl(255 90% 97%)', borderColor: 'hsl(255 90% 90%)' }}>
                  <p className="text-base font-heading font-bold leading-none" style={{ color: '#c4b5fd' }}>{s.num}</p>
                  <p className="font-semibold text-xs mt-0.5" style={{ color: '#4c1d95' }}>{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: WHAT IT BRINGS */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs border-b-2 pb-0.5 uppercase tracking-wide mb-1" style={{ borderColor: '#7c3aed', color: '#6d28d9' }}>{p('s3_title')}</h2>
            <div className="grid grid-cols-3 gap-1.5 flex-1 mb-1.5">
              <div className="border border-border rounded p-2 text-center flex flex-col justify-start">
                <p className="text-xs font-bold text-slate-400 mb-0.5">1.</p>
                <p className="text-3xl font-heading font-bold leading-tight" style={{ color: '#6d28d9' }}>{p('stat1_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{p('stat1_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug">{p('stat1_desc')}</p>
              </div>
              <div className="border border-border rounded p-2 text-center flex flex-col justify-start">
                <p className="text-xs font-bold text-slate-400 mb-0.5">2.</p>
                <p className="text-3xl font-heading font-bold leading-tight" style={{ color: '#6d28d9' }}>{p('stat2_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{p('stat2_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug">{p('stat2_desc')}</p>
              </div>
              <div className="border border-border rounded p-2 text-center flex flex-col justify-start">
                <p className="text-xs font-bold text-slate-400 mb-0.5">3.</p>
                <p className="text-3xl font-heading font-bold leading-tight" style={{ color: '#6d28d9' }}>{p('stat3_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{p('stat3_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug">{p('stat3_desc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 flex-1">
              <div className="border border-border rounded p-2">
                <p className="text-xs font-bold text-slate-400 mb-0.5">4.</p>
                <h3 className="font-heading font-bold text-xs">{p('benefit1_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{p('benefit1_desc')}</p>
              </div>
              <div className="border border-border rounded p-2">
                <p className="text-xs font-bold text-slate-400 mb-0.5">5.</p>
                <h3 className="font-heading font-bold text-xs">{p('benefit2_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{p('benefit2_desc')}</p>
              </div>
              <div className="border border-border rounded p-2">
                <p className="text-xs font-bold text-slate-400 mb-0.5">6.</p>
                <h3 className="font-heading font-bold text-xs">{p('benefit3_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{p('benefit3_desc')}</p>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="border-t-2 pt-1 text-center" style={{ borderColor: '#7c3aed' }}>
            <p className="font-heading font-bold text-xs">{p('cta')}</p>
            <div className="flex items-center justify-center gap-6 mt-0.5">
              <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline underline-offset-2 transition-colors" style={{ color: '#6d28d9' }}>dutyboost.com</a>
            </div>
          </div>

        </div>

        {/* Legal footer */}
        <div className="text-center pb-2 pt-1">
          <p className="text-xs text-muted-foreground">{p('legal')}</p>
        </div>

      </div>
      </div>
    </div>
  );
}