import { CheckCircle, XCircle, Store, Plane, Cpu, Briefcase, Package, Building2 } from "lucide-react";

function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#0a0f1e]">
      {children}
    </div>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

function StakeholderSlide({ icon: Icon, iconBg, name, subtitle, pros, cons }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full ${iconBg} text-white flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Ecosystem Stakeholder</span>
              <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] leading-tight">{name}</h2>
            </div>
          </div>
          {subtitle && <p className="text-slate-500 text-sm mb-4 max-w-3xl">{subtitle}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" /> Pros
              </h3>
              <ul className="space-y-2.5">
                {pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" /> Cons
              </h3>
              <ul className="space-y-2.5">
                {cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

export function SlideStakeholderRetailers() {
  return (
    <StakeholderSlide
      icon={Store}
      iconBg="bg-blue-600"
      name="Airport Retailers"
      subtitle="The retail endpoint where DutyCredit is redeemed and incremental sales are captured."
      pros={[
        "Incremental revenue from travellers who otherwise wouldn't buy — 92.5% net per qualifying transaction",
        "No upfront cost — performance-based participation",
        "Faster stock rotation and inventory turnover",
        "Pre-activated travellers arrive with purchase intent instead of walking past",
        "Competitive differentiation — DutyBoost retailers attract pre-activated travellers",
      ]}
      cons={[
        "10% discount applied to qualifying transactions (covered by gross-to-net spread)",
        "Requires POS integration with DutyBoost validation",
        "Initial revenue dip possible as frequent buyers redeem DutyCredits (see next slide)",
        "Adoption depends on upstream traveller activation by Travel Partners",
      ]}
    />
  );
}

export function SlideStakeholderTravelPartners() {
  return (
    <StakeholderSlide
      icon={Plane}
      iconBg="bg-indigo-600"
      name="Travel Partners"
      subtitle="Airlines, hotels, car rentals and OTAs that distribute DutyCredits through booking confirmations."
      pros={[
        "New ancillary revenue (0.5% per qualifying transaction) with zero investment",
        "Enhanced booking value — DutyCredit adds tangible benefit to confirmations",
        "Differentiated offering vs. competitors — real financial value for customers",
        "Strengthens traveller engagement without traditional loyalty points",
        "No operational change — distributed through existing booking flows",
      ]}
      cons={[
        "Requires integration to distribute DutyCredits through booking confirmations",
        "Revenue per transaction is modest (€0.10 per €20) — requires scale to be material",
        "Adoption depends on retailer and POS coverage at destination airports",
        "Traveller activation depends on upstream partner participation",
      ]}
    />
  );
}

export function SlideStakeholderPosProviders() {
  return (
    <StakeholderSlide
      icon={Cpu}
      iconBg="bg-purple-600"
      name="POS Providers"
      subtitle="Enterprise POS platforms that validate qualifying transactions and enable DutyBoost across retailers."
      pros={[
        "New transaction revenue (0.25% per qualifying transaction)",
        "Strategic position as the activation layer across multiple retailers",
        "'Integrate once, deploy repeatedly' — single integration enables many retailers",
        "Strengthens retailer relationships by enabling incremental revenue for them",
        "Differentiation in competitive POS market",
      ]}
      cons={[
        "Technical integration effort required upfront",
        "Must handle DutyCredit validation, discount application, and settlement reporting",
        "Revenue per transaction is small (€0.05 per €20) — requires transaction volume",
        "Depends on retailer adoption and upstream traveller activation",
      ]}
    />
  );
}

export function SlideStakeholderCorporate() {
  return (
    <StakeholderSlide
      icon={Briefcase}
      iconBg="bg-amber-600"
      name="Corporate Travel Partners"
      subtitle="Companies embedding DutyCredit in T&E and corporate booking flows for business travellers."
      pros={[
        "Embedded employee benefit at no company cost — DutyCredit in T&E flows",
        "Improves employee travel experience and satisfaction",
        "Potential cost savings — DutyCredit discounts reduce out-of-pocket F&B spend",
        "Data visibility on employee airport spending patterns",
        "Differentiation in corporate travel programmes",
      ]}
      cons={[
        "Requires T&E platform integration",
        "Adoption depends on retailer coverage at airports employees transit through",
        "Policy alignment needed (per-transaction limits, eligible categories)",
        "Scale depends on number of business travellers",
      ]}
    />
  );
}

export function SlideStakeholderSuppliers() {
  return (
    <StakeholderSlide
      icon={Package}
      iconBg="bg-green-600"
      name="Retail Suppliers"
      subtitle="Brands and suppliers whose products sit on airport shelves and benefit from faster sell-through."
      pros={[
        "Faster stock rotation drives more frequent reordering from retailers",
        "Incremental sell-through from existing shelf space — no new listings required",
        "No direct cost — benefits flow through retailers indirectly",
        "Brand exposure finally converts into actual sell-through",
        "Growth in supplier volume without pricing or logistics changes",
      ]}
      cons={[
        "No direct revenue participation — benefits are indirect",
        "Depends on retailer adoption of DutyBoost",
        "Limited control over DutyCredit tier alignment with product categories",
        "Must advocate DutyBoost to retail customers to see benefit",
      ]}
    />
  );
}

export function SlideStakeholderAirports() {
  return (
    <StakeholderSlide
      icon={Building2}
      iconBg="bg-violet-600"
      name="Airport Concessions"
      subtitle="Airport authorities earning concession revenue (15–18.5%) on gross retail sales."
      pros={[
        "Direct revenue growth — concession rate (15–18.5%) applies to incremental sales",
        "No upfront investment — DutyBoost grows the existing revenue base",
        "Non-aeronautical revenue growth without capital expenditure",
        "Strengthens airport retail attractiveness to concessionaires",
        "Performance-based — airport earns more as conversion increases",
      ]}
      cons={[
        "Requires supporting retailer POS activation",
        "Benefits material only once sales push past MAG threshold",
        "Depends on upstream traveller activation by Travel Partners",
        "Adoption requires coordination across multiple concessionaires",
      ]}
    />
  );
}