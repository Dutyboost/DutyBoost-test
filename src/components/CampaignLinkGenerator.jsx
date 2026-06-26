import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const MEDIUMS = [
  { value: 'email', label: '📧 Email' },
  { value: 'linkedin', label: '💬 LinkedIn' },
  { value: 'social', label: '📱 Other Social' },
  { value: 'whatsapp', label: '📲 WhatsApp' },
];

const PAGES = [
  { value: '/', label: 'Homepage' },
  { value: '/roi-calculator', label: 'ROI Calculator' },
  { value: '/retailer-one-pager', label: 'Retailer One-Pager' },
  { value: '/flight-partner-one-pager', label: 'Flight Partner One-Pager' },
  { value: '/accommodation-partner-one-pager', label: 'Accommodation One-Pager' },
  { value: '/car-rental-partner-one-pager', label: 'Car Rental One-Pager' },
  { value: '/request-more-information', label: 'Request Info' },
  { value: '/get-started', label: 'Get Started' },
];

export default function CampaignLinkGenerator() {
  const [company, setCompany] = useState('');
  const [medium, setMedium] = useState('email');
  const [page, setPage] = useState('/');
  const [copied, setCopied] = useState(false);

  const BASE = typeof window !== 'undefined' ? window.location.origin : 'https://dutyboost.com';
  const campaign = company.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const params = new URLSearchParams();
  params.set('utm_source', 'outreach');
  params.set('utm_medium', medium);
  if (campaign) params.set('utm_campaign', campaign);
  const link = campaign ? `${BASE}${page}?${params.toString()}` : '';

  const handleCopy = () => {
    if (!link) return;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-slate-800 border border-green-500/30 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <ExternalLink className="w-4 h-4 text-green-300" />
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Campaign Link Generator</h3>
      </div>
      <p className="text-xs text-slate-400">
        Tag your outreach links so every visit from a company is attributed in the
        <span className="text-green-300"> UTM Campaigns</span> table above. Enter the company name,
        copy the generated link, and use it in your email or LinkedIn message.
      </p>
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Company name</label>
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="e.g. KLM, Marriott, Hertz"
            className="w-full bg-slate-900 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-green-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Channel</label>
          <select
            value={medium}
            onChange={e => setMedium(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-green-500"
          >
            {MEDIUMS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Landing page</label>
          <select
            value={page}
            onChange={e => setPage(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-green-500"
          >
            {PAGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
      </div>
      {link ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-600 rounded-lg p-3">
            <code className="text-xs text-green-300 break-all flex-1">{link}</code>
            <button
              onClick={handleCopy}
              className="shrink-0 px-3 py-1.5 text-xs font-semibold bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            When someone clicks this link, their visit shows up under
            <span className="text-green-300"> utm_campaign = {campaign}</span> in the UTM Campaigns table above.
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic">Enter a company name above to generate a tagged link.</p>
      )}
    </div>
  );
}