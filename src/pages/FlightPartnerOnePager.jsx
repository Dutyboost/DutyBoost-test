import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const CHART_DATA = [
  { month: "Jan", issued: 36000, redeemed: 5400, commission: 5900 },
  { month: "Feb", issued: 40500, redeemed: 6075, commission: 6600 },
  { month: "Mar", issued: 49000, redeemed: 7350, commission: 8000 },
  { month: "Apr", issued: 52500, redeemed: 7875, commission: 8600 },
  { month: "May", issued: 57000, redeemed: 8550, commission: 9300 },
  { month: "Jun", issued: 65000, redeemed: 9750, commission: 10600 },
  { month: "Jul", issued: 74000, redeemed: 11100, commission: 12100 },
  { month: "Aug", issued: 69500, redeemed: 10425, commission: 11400 },
  { month: "Sep", issued: 51000, redeemed: 7650, commission: 8300 },
  { month: "Oct", issued: 44500, redeemed: 6675, commission: 7300 },
  { month: "Nov", issued: 48000, redeemed: 7200, commission: 7800 },
  { month: "Dec", issued: 37000, redeemed: 5550, commission: 6000 },
];

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
        className="print-content max-w-[794px] mx-auto px-8 py-6 print:py-0 print:px-0 bg-white flex flex-col"
        style={{ minHeight: '1122px', maxHeight: '1122px', overflow: 'hidden' }}
      >
        <div className="flex items-center justify-between pb-2">
          <DutyBoostLogo height={90} />
          <div className="text-right">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-200 text-blue-700 bg-blue-50">{p('badge')}</span>
          </div>
        </div>
        <GradientDivider />

        <div className="flex-1 flex flex-col justify-between">
          <div className="text-center py-3">
            <h1 className="text-lg font-heading font-bold leading-tight">{p('headline')}</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">{p('subtitle')}</p>
          </div>

          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#1d4ed8' }}>{p('s1_title')}</h2>
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

          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#0f766e' }}>{p('s2_title')}</h2>
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

          {/* Live Dashboard Preview */}
          <div className="py-1">
            <div className="border border-blue-100 rounded-lg bg-blue-50/40 px-3 py-2">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1.5">{t('dashboardPreview.badge')} — {t('dashboardPreview.agency.chartTitle')}</p>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-white border border-blue-100 rounded p-2 text-center">
                  <p className="text-base font-heading font-bold text-blue-600">624.000</p>
                  <p className="text-xs text-muted-foreground leading-tight">{t('dashboardPreview.agency.kpi1')}</p>
                  <p className="text-xs text-emerald-500">{t('dashboardPreview.agency.kpi1Sub')}</p>
                </div>
                <div className="bg-white border border-blue-100 rounded p-2 text-center">
                  <p className="text-base font-heading font-bold text-teal-600">157.200</p>
                  <p className="text-xs text-muted-foreground leading-tight">{t('dashboardPreview.agency.kpi2')}</p>
                  <p className="text-xs text-emerald-500">{t('dashboardPreview.agency.kpi2Sub')}</p>
                </div>
                <div className="bg-white border border-blue-100 rounded p-2 text-center">
                  <p className="text-base font-heading font-bold text-green-600">€786.000</p>
                  <p className="text-xs text-muted-foreground leading-tight">{t('dashboardPreview.agency.kpi3')}</p>
                  <p className="text-xs text-emerald-500">{t('dashboardPreview.agency.kpi3Sub')}</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={70}>
                <BarChart data={CHART_DATA} margin={{ top: 0, right: 4, bottom: 0, left: -20 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 8 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={(v) => v.toLocaleString('nl-NL')} contentStyle={{ fontSize: 10 }} />
                  <Bar dataKey="issued" fill="#bfdbfe" radius={[2,2,0,0]} barSize={8} />
                  <Bar dataKey="redeemed" fill="#1F6FFF" radius={[2,2,0,0]} barSize={8} />
                  <Bar dataKey="commission" fill="#00C48C" radius={[2,2,0,0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground text-center mt-0.5">{t('dashboardPreview.footnote')}</p>
            </div>
          </div>

          <div className="py-2 mt-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#b45309' }}>{p('s3_title')}</h2>
            <div className="mb-2"><GradientDivider /></div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#3b82f6' }}>{p('stat1_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{p('stat1_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">{p('stat1_desc')}</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#14b8a6' }}>{p('stat2_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{p('stat2_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">{p('stat2_desc')}</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#f59e0b' }}>{p('stat3_value')}</p>
                <p className="font-semibold text-xs mt-0.5">{p('stat3_label')}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">{p('stat3_desc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">{p('benefit1_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{p('benefit1_desc')}</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">{p('benefit2_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{p('benefit2_desc')}</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">{p('benefit3_title')}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{p('benefit3_desc')}</p>
              </div>
            </div>
          </div>

          <div>
            <GradientDivider />
            <div className="text-center py-4">
              <p className="font-heading font-bold text-sm">{p('cta')}</p>
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