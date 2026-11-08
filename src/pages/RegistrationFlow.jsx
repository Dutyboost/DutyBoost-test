import { useState } from "react";
import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";

const AGENCY_STEPS = [
  {
    id: 1,
    icon: "✍️",
    title: "Agency Signup",
    desc: "Agency fills out the signup form: name, company, website, booking system, and corporate travel partners.",
    action: "Visit /agency-signup",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    icon: "📋",
    title: "Application Submitted",
    desc: "Application is stored with status 'pending'. KVK, VAT, and bank details are collected to complete the profile.",
    action: "Status: pending",
    color: "from-blue-600 to-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 3,
    icon: "🔍",
    title: "DutyBoost Reviews",
    desc: "Admin reviews the application in the Admin Panel. If all fields are complete, it can be approved in one click.",
    action: "Admin Panel → Approve",
    color: "from-indigo-600 to-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    id: 4,
    icon: "📧",
    title: "Invitation Email Sent",
    desc: "Upon approval, a platform invite is sent automatically via email. A welcome email is also dispatched with a Purchase Order.",
    action: "Status: invited",
    color: "from-violet-600 to-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    id: 5,
    icon: "🔗",
    title: "Register via Magic Link",
    desc: "Agency clicks the magic link in the email, sets up their account password and confirms their email address.",
    action: "Email → Magic Link",
    color: "from-purple-600 to-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    badge: "bg-pink-100 text-pink-700",
  },
  {
    id: 6,
    icon: "🔐",
    title: "First Login",
    desc: "On first dashboard load, the system detects the 'user' role, looks up the signup application, and upgrades the role to 'agency' automatically.",
    action: "Role: agency ✓",
    color: "from-pink-600 to-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700",
  },
  {
    id: 7,
    icon: "🚀",
    title: "Agency Dashboard",
    desc: "Agency is live! They can view DutyCredits, set up API integration, and track their monthly commission revenue.",
    action: "/dashboard",
    color: "from-green-500 to-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    badge: "bg-emerald-100 text-emerald-700",
    final: true,
  },
];

const RETAILER_STEPS = [
  {
    id: 1,
    icon: "🏪",
    title: "Retailer Signup",
    desc: "Retailer fills out the signup form: store name, airport, category, KVK, VAT, bank IBAN, and accepts terms.",
    action: "Visit /retailer-signup",
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    id: 2,
    icon: "⚡",
    title: "Auto-Approval Check",
    desc: "The system checks if all required fields are present (KVK, VAT, IBAN, terms). If complete → auto-approved instantly. If incomplete → pending for admin review.",
    action: "Automation triggered",
    color: "from-orange-600 to-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    id: 3,
    icon: "🏬",
    title: "Retailer Record Created",
    desc: "A Retailer entity is created automatically: store name, airport, category, and owner email are linked to the account.",
    action: "Retailer entity created",
    color: "from-amber-600 to-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 4,
    icon: "📨",
    title: "Welcome Email + PO",
    desc: "A welcome email is sent with a Purchase Order attachment confirming the partnership terms and the platform fee model.",
    action: "Email: hello@dutyboost.com",
    color: "from-yellow-600 to-lime-600",
    bg: "bg-lime-50",
    border: "border-lime-200",
    badge: "bg-lime-100 text-lime-700",
  },
  {
    id: 5,
    icon: "🔗",
    title: "Register via Magic Link",
    desc: "Retailer receives a separate platform invite email, clicks the magic link to verify their email and activate the account.",
    action: "Email → Magic Link",
    color: "from-lime-600 to-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    badge: "bg-teal-100 text-teal-700",
  },
  {
    id: 6,
    icon: "🔐",
    title: "First Login",
    desc: "On first dashboard load, the system detects the 'user' role, looks up the signup application, and upgrades the role to 'retailer' automatically.",
    action: "Role: retailer ✓",
    color: "from-teal-600 to-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    badge: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 7,
    icon: "🎉",
    title: "Retailer Dashboard",
    desc: "Retailer is live! They can scan vouchers, view transaction history, and manage their store profile.",
    action: "/partner",
    color: "from-green-500 to-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    badge: "bg-emerald-100 text-emerald-700",
    final: true,
  },
];

function StepCard({ step, index, total, direction }) {
  return (
    <div className={`relative flex flex-col ${step.bg} border-2 ${step.border} rounded-2xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 w-48 flex-shrink-0`}>
      {/* Step number */}
      <div className={`absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-bold flex items-center justify-center shadow-md`}>
        {step.id}
      </div>

      {/* Icon */}
      <div className="text-3xl mb-3 text-center">{step.icon}</div>

      {/* Title */}
      <div className="font-bold text-gray-800 text-sm text-center mb-2 leading-tight">{step.title}</div>

      {/* Description */}
      <div className="text-xs text-gray-500 text-center leading-relaxed flex-1">{step.desc}</div>

      {/* Action badge */}
      <div className={`mt-3 text-center text-xs font-semibold px-2 py-1 rounded-full ${step.badge}`}>
        {step.action}
      </div>

      {step.final && (
        <div className="absolute -top-2 -right-2">
          <span className="text-lg">✅</span>
        </div>
      )}
    </div>
  );
}

function Arrow({ direction = "right" }) {
  const arrows = {
    right: "→",
    down: "↓",
    left: "←",
  };
  return (
    <div className="flex items-center justify-center flex-shrink-0 text-gray-300 font-bold text-2xl w-8">
      {arrows[direction]}
    </div>
  );
}

function SnakeFlow({ steps, label, accent }) {
  // Row 1: steps 1-4 (left to right)
  // Arrow down
  // Row 2: steps 5-7 (right to left)
  const row1 = steps.slice(0, 4);
  const row2 = steps.slice(4);

  return (
    <div className="mb-6">
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6 ${accent}`}>
        {label}
      </div>

      {/* Row 1: left → right */}
      <div className="flex items-center gap-0">
        {row1.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <StepCard step={step} />
            {i < row1.length - 1 && <Arrow direction="right" />}
          </div>
        ))}
        {/* Corner arrow going down */}
        <div className="flex flex-col items-center ml-0">
          <Arrow direction="down" />
        </div>
      </div>

      {/* Row 2: right → left (reversed visually) */}
      <div className="flex items-center gap-0 mt-0 justify-end" style={{ marginTop: '-16px' }}>
        {[...row2].reverse().map((step, i) => (
          <div key={step.id} className="flex items-center">
            {i < row2.length - 1 && <Arrow direction="left" />}
            <StepCard step={step} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RegistrationFlow() {
  const [activeFlow, setActiveFlow] = useState("both");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <DutyBoostLogo height={90} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-heading">Registration Flows</h1>
              <p className="text-sm text-gray-500">End-to-end onboarding journey for agencies & retailers</p>
            </div>
          </div>
          <Link to="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 mb-8 bg-white border border-gray-200 rounded-xl p-1 w-fit shadow-sm">
          {[
            { id: "both", label: "Both Flows" },
            { id: "agency", label: "🏢 Agency Flow" },
            { id: "retailer", label: "🏪 Retailer Flow" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFlow(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFlow === tab.id
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Flows */}
        <div className="space-y-12 overflow-x-auto pb-8">
          {(activeFlow === "both" || activeFlow === "agency") && (
            <div className="bg-white rounded-3xl border border-blue-100 shadow-lg p-8">
              <SnakeFlow
                steps={AGENCY_STEPS}
                label="🏢 Travel Agency Registration Flow"
                accent="bg-blue-100 text-blue-800"
              />
            </div>
          )}

          {(activeFlow === "both" || activeFlow === "retailer") && (
            <div className="bg-white rounded-3xl border border-orange-100 shadow-lg p-8">
              <SnakeFlow
                steps={RETAILER_STEPS}
                label="🏪 Airport Retailer Registration Flow"
                accent="bg-orange-100 text-orange-800"
              />
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2"><span className="text-xl">✍️</span> User action</div>
          <div className="flex items-center gap-2"><span className="text-xl">⚡</span> Automated step</div>
          <div className="flex items-center gap-2"><span className="text-xl">📧</span> Email triggered</div>
          <div className="flex items-center gap-2"><span className="text-xl">✅</span> Flow complete</div>
        </div>
      </div>
    </div>
  );
}