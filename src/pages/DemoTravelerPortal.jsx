import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import QRCodeDisplay from "../components/QRCodeDisplay";
import {
  QrCode, History, Store, LogOut, MapPin, Clock,
  CheckCircle, RefreshCw, ShoppingBag, Ticket, ChevronRight,
  Plane, AlertCircle, Eye
} from "lucide-react";

const DEMO_USER = {
  full_name: "Anna Schmidt",
  email: "anna.schmidt@example.com",
};

const DEMO_VOUCHERS = [
  {
    id: "v1",
    voucher_code: "DTB-AMS-2026-0521",
    discount_percentage: 15,
    airport: "Amsterdam Airport (AMS)",
    expiration_date: "2026-06-15",
    status: "active",
    traveler_email: "anna.schmidt@example.com",
  },
  {
    id: "v2",
    voucher_code: "DTB-EHV-2026-0312",
    discount_percentage: 12,
    airport: "Eindhoven Airport (EHV)",
    expiration_date: "2026-05-30",
    status: "redeemed",
    traveler_email: "anna.schmidt@example.com",
  },
  {
    id: "v3",
    voucher_code: "DTB-AMS-2026-0228",
    discount_percentage: 20,
    airport: "Amsterdam Airport (AMS)",
    expiration_date: "2026-04-15",
    status: "redeemed",
    traveler_email: "anna.schmidt@example.com",
  },
  {
    id: "v4",
    voucher_code: "DTB-EHV-2026-0101",
    discount_percentage: 10,
    airport: "Eindhoven Airport (EHV)",
    expiration_date: "2025-12-31",
    status: "expired",
    traveler_email: "anna.schmidt@example.com",
  },
];

const DEMO_RETAILERS = [
  {
    id: "r1",
    store_name: "Dutch Duty Free",
    airport: "Amsterdam (AMS)",
    category: "Retail",
    accepts_vouchers: true,
  },
  {
    id: "r2",
    store_name: "Heineken Experience Shop",
    airport: "Amsterdam (AMS)",
    category: "Food & Beverage",
    accepts_vouchers: true,
  },
  {
    id: "r3",
    store_name: "Schiphol Chocolaterie",
    airport: "Amsterdam (AMS)",
    category: "Food & Beverage",
    accepts_vouchers: true,
  },
  {
    id: "r4",
    store_name: "Eindhoven Retail Hub",
    airport: "Eindhoven (EHV)",
    category: "Retail",
    accepts_vouchers: true,
  },
  {
    id: "r5",
    store_name: "EHV Duty Free",
    airport: "Eindhoven (EHV)",
    category: "Retail",
    accepts_vouchers: true,
  },
];

export default function DemoTravelerPortal() {
  const { t } = useTranslation();
  const [tab, setTab] = useState("credits");
  const [activeQR, setActiveQR] = useState(null);

  const TABS = [
    { id: "credits", label: t('traveler.tabCredits'), icon: Ticket },
    { id: "stores", label: t('traveler.tabStores'), icon: Store },
    { id: "history", label: t('traveler.tabHistory'), icon: History },
  ];

  const activeVouchers = DEMO_VOUCHERS.filter(v => v.status === "active");
  const redeemedVouchers = DEMO_VOUCHERS.filter(v => v.status === "redeemed");
  const expiredVouchers = DEMO_VOUCHERS.filter(v => v.status === "expired");

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Demo badge */}
      <div className="bg-amber-50 border-b border-amber-200 px-5 py-2 flex items-center justify-between">
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs flex items-center gap-1">
          <Eye className="w-3 h-3" /> Demo Mode
        </Badge>
        <p className="text-xs text-amber-700">Sample data for demonstration</p>
      </div>

      {/* Header */}
      <header className="bg-card border-b border-border px-5 pt-8 pb-4 flex items-center justify-between sticky top-0 z-10">
        <DutyBoostLogo height={80} />
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs font-medium text-foreground">{DEMO_USER.full_name}</p>
            <p className="text-xs text-muted-foreground">{DEMO_USER.email}</p>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors ml-1">
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Tab nav */}
      <div className="flex border-b border-border bg-card px-4">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors border-b-2 -mb-px ${
              tab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-6">
        {tab === "credits" && (
          <div className="px-5 py-6 space-y-5">
            {/* Summary */}
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-3xl p-5 text-primary-foreground shadow-lg">
              <p className="text-xs opacity-70 uppercase tracking-wider mb-1">{t('traveler.yourCredits')}</p>
              <div className="flex items-end gap-3 mt-2">
                <p className="text-4xl font-heading font-bold">{activeVouchers.length}</p>
                <p className="text-sm opacity-80 mb-1">active</p>
              </div>
              <div className="flex gap-4 mt-3 text-xs opacity-70">
                <span>{redeemedVouchers.length} {t('traveler.redeemed')}</span>
                <span>{expiredVouchers.length} {t('traveler.expired')}</span>
              </div>
            </div>

            {/* Active vouchers */}
            {activeVouchers.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider">{t('traveler.activeLabel')}</h2>
                {activeVouchers.map((v) => (
                  <VoucherCard
                    key={v.id}
                    voucher={v}
                    isQROpen={activeQR === v.voucher_code}
                    onToggleQR={() => setActiveQR(activeQR === v.voucher_code ? null : v.voucher_code)}
                  />
                ))}
              </div>
            )}

            {/* Past vouchers */}
            {(redeemedVouchers.length > 0 || expiredVouchers.length > 0) && (
              <div className="space-y-3">
                <h2 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider">{t('traveler.pastLabel')}</h2>
                {[...redeemedVouchers, ...expiredVouchers].map((v) => (
                  <PastVoucherRow key={v.id} voucher={v} />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "stores" && (
          <div className="px-5 py-6 space-y-4">
            <div>
              <h2 className="font-heading font-bold text-lg">{t('traveler.storesTitle')}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t('traveler.storesSub')}</p>
            </div>

            <div className="space-y-2">
              {DEMO_RETAILERS.map((r) => (
                <div key={r.id} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${r.category === "Food & Beverage" ? "bg-orange-50" : "bg-blue-50"}`}>
                    {r.category === "Food & Beverage"
                      ? <ShoppingBag className="w-4 h-4 text-orange-600" />
                      : <ShoppingBag className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{r.store_name}</p>
                    <p className="text-xs text-muted-foreground">{r.airport} · {r.category}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">{t('traveler.storeActive')}</Badge>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800" dangerouslySetInnerHTML={{ __html: t('traveler.minSpend') }} />
          </div>
        )}

        {tab === "history" && (
          <div className="px-5 py-6 space-y-4">
            <h2 className="font-heading font-bold text-lg">{t('traveler.historyTitle')}</h2>
            {redeemedVouchers.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <History className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">{t('traveler.noHistory')}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {redeemedVouchers.map((v) => (
                  <div key={v.id} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{v.airport}</p>
                        <p className="text-xs text-muted-foreground">{v.voucher_code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{v.discount_percentage}% off</p>
                      <p className="text-xs text-muted-foreground">{v.expiration_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function VoucherCard({ voucher, isQROpen, onToggleQR }) {
  const { t } = useTranslation();
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-5 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs opacity-70 uppercase tracking-wider">DutyCredit</p>
            <p className="text-4xl font-heading font-bold mt-1">{voucher.discount_percentage}%</p>
            <p className="text-sm opacity-80">{t('traveler.offPurchase')}</p>
          </div>
          <Badge className="bg-white/20 text-white border-white/30 text-xs">
            <CheckCircle className="w-3 h-3 mr-1" /> Active
          </Badge>
        </div>
        <div className="flex gap-4 mt-4 text-xs opacity-70">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{voucher.airport}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t('traveler.expires')} {voucher.expiration_date}</span>
        </div>
      </div>

      <div className="p-4">
        {!isQROpen ? (
          <button
            onClick={onToggleQR}
            className="w-full flex items-center justify-between bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 transition-colors"
          >
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <QrCode className="w-4 h-4" />
              {t('traveler.showQR')}
            </div>
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="p-4 bg-white rounded-2xl shadow-inner border border-border">
              <QRCodeDisplay value={voucher.voucher_code} size={200} />
            </div>
            <p className="font-mono text-base font-bold tracking-widest text-center">{voucher.voucher_code}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-amber-800 text-center w-full">
              {t('traveler.presentQR')}
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={onToggleQR}>
              {t('traveler.hideQR')}
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-3 font-mono">{voucher.voucher_code}</p>
      </div>
    </div>
  );
}

function PastVoucherRow({ voucher }) {
  const { t } = useTranslation();
  const isRedeemed = voucher.status === "redeemed";
  return (
    <div className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center justify-between opacity-70">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isRedeemed ? "bg-green-50" : "bg-muted"}`}>
          {isRedeemed
            ? <CheckCircle className="w-4 h-4 text-green-600" />
            : <AlertCircle className="w-4 h-4 text-muted-foreground" />}
        </div>
        <div>
          <p className="text-sm font-medium">{voucher.airport} · {voucher.discount_percentage}% off</p>
          <p className="text-xs text-muted-foreground">{voucher.voucher_code}</p>
        </div>
      </div>
      <Badge className={`text-xs ${isRedeemed ? "bg-green-100 text-green-700 border-green-200" : "bg-muted text-muted-foreground"}`}>
        {isRedeemed ? t('traveler.redeemed') : t('traveler.expired')}
      </Badge>
    </div>
  );
}