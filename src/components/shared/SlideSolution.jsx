import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Zap, Briefcase, RefreshCw } from "lucide-react";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import { SlideWrapper, GridBg } from "@/components/investor/v2/Shared";

export function SlideSolution({ currency = "€" }) {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">The Solution</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              Activate the Traveller <span className="text-blue-600">Days, Weeks</span><br /><span className="text-blue-600">or even Months</span> Before Airport Arrival
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-6">
            <div className="bg-violet-600 border border-violet-700 rounded-2xl p-5 text-center text-white">
              <Zap className="w-10 h-10 mx-auto mb-3 text-white" />
              <Link to="/eligibility-showcase" target="_blank" rel="noopener noreferrer" className="font-semibold mb-1 inline-flex items-center gap-1 underline decoration-white/40 hover:decoration-white">
                DutyBoost Platform
              </Link>
              <div className="text-violet-100 text-sm">Travellers generate their own DutyCredits directly — no partner required</div>
            </div>
            {[
              { Icon: TravelAgencyIcon, color: "text-blue-600", title: "Flight Booking", desc: "DutyCredit distributed with airline confirmation" },
              { Icon: HotelIcon, color: "text-violet-600", title: "Hotel / OTA", desc: "DutyCredit distributed with booking confirmation" },
              { Icon: CarRentalIcon, color: "text-green-600", title: "Car Rental", desc: "DutyCredit distributed with rental confirmation" },
              { Icon: Briefcase, color: "text-amber-600", title: "Corporate Travel", desc: "DutyCredit embedded in T&E and corporate booking flows" },
            ].map((step, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                <step.Icon className={`w-10 h-10 mx-auto mb-3 ${step.color}`} />
                <div className="text-slate-800 font-semibold mb-1">{step.title}</div>
                <div className="text-slate-500 text-sm">{step.desc}</div>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-stretch gap-2 mb-6">
            {[
              "Partners distribute DutyCredit",
              "Traveller activates benefit",
              "Arrives with purchase intent",
              "Visits participating retailer",
              `Spends ${currency}100 → Saves ${currency}10`,
              "POS validates transaction",
              "All participants earn",
            ].map((step, i, arr) => (
              <Fragment key={i}>
                <div className="flex-1 min-w-0 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 text-center flex flex-col justify-start">
                  <div className="text-blue-600 text-xs font-semibold leading-none h-3.5 flex items-center justify-center">Step {i + 1}</div>
                  <div className="text-slate-800 text-xs mt-1 leading-tight">{step}</div>
                </div>
                {i < arr.length - 1 && <ChevronRight className="text-blue-500 flex-shrink-0 self-center w-4 h-4" />}
              </Fragment>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center items-start">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-blue-600 h-9 flex items-center justify-center whitespace-nowrap">{currency}1 – {currency}60</div>
                <div className="text-slate-500 text-sm mt-2">DutyCredit direct traveller value</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-blue-600 h-9 flex items-center justify-center whitespace-nowrap">Performance-Based</div>
                <div className="text-slate-500 text-sm mt-2">Zero upfront cost to any partner</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-blue-600 h-9 flex items-center justify-center whitespace-nowrap">Participants</div>
                <div className="text-slate-500 text-sm mt-2">All benefit from one transaction</div>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 text-sm leading-relaxed">
                <span className="font-bold">Single-use, infinitely renewable.</span> A DutyCredit can't be reused — but travellers can get one from a Travel or Corporate Partner and generate as many more as they need for other participating stores. One DutyCredit for cosmetics, another for electronics, another at the giftshop for a souvenir. Same traveller, different stores, everyone wins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

export default SlideSolution;