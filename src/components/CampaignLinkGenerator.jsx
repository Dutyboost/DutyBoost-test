import { useState } from 'react';
import { ExternalLink, Users, User } from 'lucide-react';

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

// Merge-tag syntax per bulk email / outreach tool.
// The placeholder gets injected into utm_campaign automatically per recipient.
const MERGE_TOOLS = [
  { value: 'lemlist',     label: 'Lemlist / Instantly / Smartlead', tag: '{{company}}' },
  { value: 'mailchimp',   label: 'Mailchimp',                        tag: '*|COMPANY|*' },
  { value: 'hubspot',     label: 'HubSpot',                          tag: '{{contact.company}}' },
  { value: 'outreach',    label: 'Outreach.io',                      tag: '{{company}}' },
  { value: 'generic',     label: 'Generic ({{company}})',            tag: '{{company}}' },
];

function slugify(s) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function CampaignLinkGenerator() {
  const [mode, setMode] = useState('bulk'); // 'single' | 'bulk'
  const [company, setCompany] = useState('');
  const [medium, setMedium] = useState('email');
  const [page, setPage] = useState('/');
  const [mergeTool, setMergeTool] = useState('lemlist');
  const [copied, setCopied] = useState(false);

  const BASE = 'https://dutyboost.com';

  // Single mode: one concrete link for one company
  const campaignSlug = slugify(company);
  const singleParams = new URLSearchParams();
  singleParams.set('utm_source', 'outreach');
  singleParams.set('utm_medium', medium);
  if (campaignSlug) singleParams.set('utm_campaign', campaignSlug);
  const singleLink = campaignSlug ? `${BASE}${page}?${singleParams.toString()}` : '';

  // Bulk mode: one templated link with a merge-tag placeholder
  const mergeTag = MERGE_TOOLS.find(t => t.value === mergeTool)?.tag || '{{company}}';
  const bulkParams = new URLSearchParams();
  bulkParams.set('utm_source', 'outreach');
  bulkParams.set('utm_medium', medium);
  bulkParams.set('utm_campaign', mergeTag);
  const bulkLink = `${BASE}${page}?${bulkParams.toString()}`;

  const link = mode === 'single' ? singleLink : bulkLink;

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
        Tag your outreach links so every visit is attributed to a specific company in the
        <span className="text-green-300"> UTM Campaigns</span> table above.
        Use <span className="text-slate-300">Bulk</span> mode for mass outreach — one link auto-personalizes per recipient.
      </p>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('bulk')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            mode === 'bulk' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" /> Bulk outreach (mail merge)
        </button>
        <button
          onClick={() => setMode('single')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            mode === 'single' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" /> Single company
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {mode === 'single' && (
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
        )}
        {mode === 'bulk' && (
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Email / outreach tool</label>
            <select
              value={mergeTool}
              onChange={e => setMergeTool(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-green-500"
            >
              {MERGE_TOOLS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        )}
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
          {mode === 'bulk' ? (
            <div className="space-y-1">
              <p className="text-xs text-slate-500">
                Paste this <strong className="text-slate-300">one</strong> link into your bulk email template.
                Your tool replaces <code className="text-green-300">{mergeTag}</code> with each recipient's company name
                automatically — so 5,000 airlines each get a unique tagged link from a single template.
              </p>
              <p className="text-xs text-slate-500">
                Each visit then appears under <span className="text-green-300">utm_campaign = [company name]</span> above,
                ready to cross-reference with your campaign list.
              </p>
              <p className="text-xs text-slate-600 italic">
                Make sure your contact list has a "company" column — that's what the merge tag pulls from.
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              When someone clicks this link, their visit shows up under
              <span className="text-green-300"> utm_campaign = {campaignSlug}</span> in the UTM Campaigns table above.
            </p>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic">Enter a company name above to generate a tagged link.</p>
      )}
    </div>
  );
}