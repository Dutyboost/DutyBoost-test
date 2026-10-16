import { useState, useRef, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import OnePagerLogo from "../components/OnePagerLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function RetailerOnePager() {
  const { t, i18n } = useTranslation();
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
    pdf.save('retailer-one-pager.pdf');
  };

  const steps = [
    { num: "01", title: t('retaileronepager.step1_title'), desc: t('retaileronepager.step1_desc') },
    { num: "02", title: t('retaileronepager.step2_title'), desc: t('retaileronepager.step2_desc') },
    { num: "03", title: t('retaileronepager.step3_title'), desc: t('retaileronepager.step3_desc') },
    { num: "04", title: t('retaileronepager.step4_title'), desc: t('retaileronepager.step4_desc') },
  ];

  const why = [
    { num: 1, title: t('retaileronepager.why1_title'), desc: t('retaileronepager.why1_desc') },
    { num: 2, title: t('retaileronepager.why2_title'), desc: t('retaileronepager.why2_desc') },
    { num: 3, title: t('retaileronepager.why3_title'), desc: t('retaileronepager.why3_desc') },
    { num: 4, title: t('retaileronepager.why4_title'), desc: t('retaileronepager.why4_desc') },
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 25%, hsl(216 45% 96%) 50%, hsl(220 40% 97%) 75%, hsl(216 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <LanguageSwitcher />
        <Button onClick={handleDownloadPDF} className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      {/* A4-style content */}
      <div className="print-content max-w-[794px] mx-auto bg-white" style={{ width: '794px', height: '1122px', overflow: 'hidden' }}>
      <div ref={innerRef} className="px-8 py-2 flex flex-col" style={{ width: '794px', minHeight: '1122px', transformOrigin: 'top center', transform: `scale(${scale})` }}>

        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-orange-500 pb-1">
          <OnePagerLogo height={36} />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col justify-between">

          {/* HEADLINE SECTION */}
          <div className="text-center py-1">
            <h1 className="text-xl font-heading font-bold leading-tight">{t('retaileronepager.headline')}</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">
              {t('retaileronepager.subtitle')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t('retaileronepager.audience_label')}</span>
              {[t('retaileronepager.audience1'), t('retaileronepager.audience2'), t('retaileronepager.audience3')].map((label) => (
                <span key={label} className="text-[10px] font-semibold text-orange-700 bg-orange-50 border border-orange-100 rounded-full px-2 py-0.5">{label}</span>
              ))}
            </div>
          </div>

          {/* SECTION 1: WHY IT MATTERS */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs border-b-2 border-orange-500 pb-0.5 text-orange-700 uppercase tracking-wide mb-1">{t('retaileronepager.s1_title')}</h2>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {why.map(c => (
                <div key={c.title} className="bg-slate-50 rounded p-2 border border-border">
                  <p className="font-semibold text-xs"><span style={{ color: '#ea580c', marginRight: '4px' }}>{c.num}.</span>{c.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: HOW IT WORKS */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs border-b-2 border-orange-500 pb-0.5 text-orange-700 uppercase tracking-wide mb-1">{t('retaileronepager.s2_title')}</h2>
            <div className="grid grid-cols-4 gap-1.5 flex-1">
              {steps.map(s => (
                <div key={s.num} className="bg-orange-50 rounded p-2 border border-orange-100">
                  <p className="text-base font-heading font-bold text-orange-300 leading-none">{s.num}</p>
                  <p className="font-semibold text-xs text-orange-800 mt-0.5">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: WHAT IT BRINGS */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs border-b-2 border-orange-500 pb-0.5 text-orange-700 uppercase tracking-wide mb-1">{t('retaileronepager.s3_title')}</h2>
            <div className="grid grid-cols-3 gap-1.5 flex-1 mb-1.5">
              <div className="border border-border rounded p-2 text-center flex flex-col justify-start">
                <p className="text-xs font-bold text-slate-400 mb-0.5">1.</p>
                <p className="text-3xl font-heading font-bold text-orange-700 leading-tight">{t('retaileronepager.stat1_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{t('retaileronepager.stat1_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.stat1_desc')}</p>
              </div>
              <div className="border border-border rounded p-2 text-center flex flex-col justify-start">
                <p className="text-xs font-bold text-slate-400 mb-0.5">2.</p>
                <div className="flex items-center justify-center mb-1">
                  <svg width="44" height="44" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="55" cy="103" rx="32" ry="4" fill="#00000015"/>
                    <rect x="12" y="72" width="13" height="28" fill="#fdba7480" rx="2"/>
                    <rect x="28" y="58" width="13" height="42" fill="#f9731680" rx="2"/>
                    <rect x="44" y="64" width="13" height="36" fill="#ea580c80" rx="2"/>
                    <rect x="60" y="46" width="13" height="54" fill="#c2410c99" rx="2"/>
                    <polyline points="14,88 35,70 55,76 78,50" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <polyline points="14,88 35,70 55,76 78,50" stroke="#c2410c" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="88" cy="22" r="20" fill="#ea580c"/>
                    <text x="88" y="22" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle" dominantBaseline="middle">€</text>
                    <ellipse cx="88" cy="44" rx="14" ry="4" fill="#00000018"/>
                  </svg>
                </div>
                <p className="font-semibold text-xs mt-0.5">{t('retaileronepager.stat2_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.stat2_desc')}</p>
              </div>
              <div className="border border-border rounded p-2 text-center flex flex-col justify-start">
                <p className="text-xs font-bold text-slate-400 mb-0.5">3.</p>
                <p className="text-xl font-heading font-bold text-orange-700 leading-tight">{t('retaileronepager.stat3_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{t('retaileronepager.stat3_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug whitespace-pre-line text-left">{t('retaileronepager.stat3_desc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 flex-1">
              <div className="border border-border rounded p-2">
                <p className="text-xs font-bold text-slate-400 mb-0.5">4.</p>
                <h3 className="font-heading font-bold text-xs">{t('retaileronepager.benefit1_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.benefit1_desc')}</p>
              </div>
              <div className="border border-border rounded p-2">
                <p className="text-xs font-bold text-slate-400 mb-0.5">5.</p>
                <h3 className="font-heading font-bold text-xs">{t('retaileronepager.benefit2_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.benefit2_desc')}</p>
              </div>
              <div className="border border-border rounded p-2">
                <p className="text-xs font-bold text-slate-400 mb-0.5">6.</p>
                <h3 className="font-heading font-bold text-xs">{t('retaileronepager.benefit3_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t('retaileronepager.benefit3_desc')}</p>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="border-t-2 border-orange-500 pt-1 text-center">
            <p className="font-heading font-bold text-xs">{t('retaileronepager.cta')}</p>
            <div className="flex items-center justify-center gap-6 mt-0.5">
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
    </div>
  );
}