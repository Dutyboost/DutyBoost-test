import { useState, useRef, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import OnePagerLogo from "../components/OnePagerLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

const GradientDivider = () => (
  <div style={{ height: '2px', background: 'linear-gradient(to right, #7c3aed, #6366f1, #8b5cf6)', width: '100%' }} />
);

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
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
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
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(255 60% 97%) 0%, hsl(243 50% 95%) 50%, hsl(255 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <LanguageSwitcher allowedLanguages={["en", "fr", "de"]} />
        <Button onClick={handleDownloadPDF} className="gap-2 text-white" style={{ background: 'linear-gradient(to right, #7c3aed, #6366f1)' }}>
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      {/* A4-style content */}
      <div className="print-content max-w-[794px] mx-auto bg-white" style={{ width: '794px', height: '1122px', overflow: 'hidden' }}>
        <div ref={innerRef} className="px-8 py-3 flex flex-col" style={{ width: '794px', minHeight: '1122px', transformOrigin: 'top center', transform: `scale(${scale})` }}>

          {/* Header */}
          <div className="flex items-center justify-between pb-1">
            <OnePagerLogo height={40} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6d28d9' }}>{p('badge')}</span>
          </div>
          <GradientDivider />

          {/* MAIN CONTENT */}
          <div className="flex-1 flex flex-col">

            {/* HEADLINE SECTION */}
            <div className="text-center py-1">
              <h1 className="text-base font-heading font-bold leading-tight">{p('headline')}</h1>
              <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">{p('subtitle')}</p>
            </div>

            {/* SECTION 1: WHY IT MATTERS */}
            <div className="flex-1 flex flex-col py-1">
              <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: '#6d28d9' }}>{p('s1_title')}</h2>
              <div className="mb-1"><GradientDivider /></div>
              <div className="grid grid-cols-2 gap-1.5 flex-1">
                {why.map(c => (
                  <div key={c.title} className="bg-slate-50 rounded p-2 border border-border">
                    <p className="font-semibold text-xs mb-0.5"><span style={{ color: '#7c3aed', marginRight: '4px' }}>{c.num}.</span>{c.title}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: HOW IT WORKS */}
            <div className="flex-1 flex flex-col py-1">
              <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: '#4c1d95' }}>{p('s2_title')}</h2>
              <div className="mb-1"><GradientDivider /></div>
              <div className="grid grid-cols-4 gap-1.5 flex-1">
                {steps.map(s => (
                  <div key={s.num} className="rounded p-2 border" style={{ background: 'hsl(255 90% 97%)', borderColor: 'hsl(255 90% 90%)' }}>
                    <p className="text-base font-heading font-bold leading-none" style={{ color: '#c4b5fd' }}>{s.num}</p>
                    <p className="font-semibold text-xs mt-0.5" style={{ color: '#4c1d95' }}>{s.title}</p>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: WHAT IT BRINGS */}
            <div className="flex-1 flex flex-col py-1">
              <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: '#7c3aed' }}>{p('s3_title')}</h2>
              <div className="mb-1"><GradientDivider /></div>
              <div className="grid grid-cols-3 gap-1.5 flex-1 mb-1.5 items-stretch">
                <div className="border border-border rounded p-2 text-center flex flex-col justify-start">
                  <p className="text-xs font-bold text-slate-400 mb-0.5">1.</p>
                  <p className="text-xl font-heading font-bold leading-tight" style={{ color: '#7c3aed' }}>{p('stat1_value')}</p>
                  <p className="font-semibold text-xs mt-0.5">{p('stat1_label')}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{p('stat1_desc')}</p>
                </div>
                <div className="border border-border rounded p-2 text-center flex flex-col justify-start">
                  <p className="text-xs font-bold text-slate-400 mb-0.5">2.</p>
                  <p className="text-xl font-heading font-bold leading-tight" style={{ color: '#6366f1' }}>{p('stat2_value')}</p>
                  <p className="font-semibold text-xs mt-0.5">{p('stat2_label')}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{p('stat2_desc')}</p>
                </div>
                <div className="border border-border rounded p-2 text-center flex flex-col justify-start">
                  <p className="text-xs font-bold text-slate-400 mb-0.5">3.</p>
                  <p className="text-xl font-heading font-bold leading-tight" style={{ color: '#8b5cf6' }}>{p('stat3_value')}</p>
                  <p className="font-semibold text-xs mt-0.5">{p('stat3_label')}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{p('stat3_desc')}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 flex-1">
                <div className="border border-border rounded p-2">
                  <p className="text-xs font-bold text-slate-400 mb-0.5">4.</p>
                  <h3 className="font-heading font-bold text-xs mb-0.5">{p('benefit1_title')}</h3>
                  <p className="text-xs text-muted-foreground leading-snug">{p('benefit1_desc')}</p>
                </div>
                <div className="border border-border rounded p-2">
                  <p className="text-xs font-bold text-slate-400 mb-0.5">5.</p>
                  <h3 className="font-heading font-bold text-xs mb-0.5">{p('benefit2_title')}</h3>
                  <p className="text-xs text-muted-foreground leading-snug">{p('benefit2_desc')}</p>
                </div>
                <div className="border border-border rounded p-2">
                  <p className="text-xs font-bold text-slate-400 mb-0.5">6.</p>
                  <h3 className="font-heading font-bold text-xs mb-0.5">{p('benefit3_title')}</h3>
                  <p className="text-xs text-muted-foreground leading-snug">{p('benefit3_desc')}</p>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION */}
            <div>
              <GradientDivider />
              <div className="text-center py-1.5">
                <p className="font-heading font-bold text-xs">{p('cta')}</p>
                <div className="flex items-center justify-center gap-1.5 mt-0.5 text-xs">
                  <span className="font-semibold" style={{ color: '#6d28d9' }}>Visit:</span>
                  <a href="https://dutyboost.com/pos-partner" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2" style={{ color: '#6d28d9' }}>POS Partnership</a>
                </div>
              </div>
            </div>

          </div>

          {/* Legal footer */}
          <div className="text-center pb-1">
            <p className="text-xs text-muted-foreground">{p('legal')}</p>
          </div>

        </div>
      </div>
    </div>
  );
}