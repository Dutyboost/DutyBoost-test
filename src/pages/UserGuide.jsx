import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { BookOpen, Users, Store, Smartphone, Download, CheckCircle2, ArrowRight, Globe, Zap, QrCode } from "lucide-react";

export default function UserGuide() {
  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="border-b border-border px-6 h-16 flex items-center sticky top-0 bg-background/95 backdrop-blur z-10">
        <Link to="/"><DutyBoostLogo height={130} /></Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl font-heading font-bold">DutyBoost User Guide</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know to get started with DutyBoost — the travel retail conversion platform connecting travel agencies, airport retailers, and travelers.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <h2 className="font-heading font-semibold text-lg">Contents</h2>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li><a href="#overview" className="hover:text-primary transition-colors">Platform Overview</a></li>
            <li><a href="#travel-agencies" className="hover:text-primary transition-colors">Guide for Travel Agencies</a></li>
            <li><a href="#retailers" className="hover:text-primary transition-colors">Guide for Airport Retailers</a></li>
            <li><a href="#travelers" className="hover:text-primary transition-colors">Guide for Travelers</a></li>
            <li><a href="#mobile" className="hover:text-primary transition-colors">Installing DutyBoost on Your Mobile Device</a></li>
          </ol>
        </div>

        {/* Overview */}
        <section id="overview" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-bold">1. Platform Overview</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            DutyBoost is a Travel Retail Conversion Platform that bridges travel agencies, airport retailers, and travelers through a smart incentive system called <strong>DutyCredits</strong>. When a traveler books a flight through a participating travel agency, they automatically receive a DutyCredit — a digital discount voucher redeemable at participating airport shops.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {[
              { icon: Users, title: "Travel Agencies", desc: "Generate DutyCredits automatically for every qualifying booking." },
              { icon: Zap, title: "DutyCredits", desc: "Smart vouchers delivered to travelers before they reach the airport." },
              { icon: Store, title: "Airport Retailers", desc: "Scan vouchers at checkout and attract high-intent airport shoppers." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-4 space-y-2">
                <Icon className="w-5 h-5 text-primary" />
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Agencies */}
        <section id="travel-agencies" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-bold">2. Guide for Travel Agencies</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            As a travel agency, DutyBoost runs silently in the background — your main job is a one-time integration setup.
          </p>
          <div className="space-y-3">
            {[
              { step: "1", title: "Sign Up & Get Approved", desc: "Go to dutyboost.com and click 'Get Started'. Fill in your business details, choose a payment method, and accept the terms. Our team reviews your application within 1 business day." },
              { step: "2", title: "Set Up API Integration", desc: "After approval, log in to your dashboard and visit the Integration Guide. You will find your unique API key and code examples to connect your booking system (Amadeus, Sabre, TravelPort, etc.). Every time a booking is confirmed, your system sends the booking details to DutyBoost via a simple API call." },
              { step: "3", title: "DutyCredits Are Generated Automatically", desc: "Once integrated, DutyBoost automatically generates a DutyCredit voucher for every qualifying booking. The voucher is linked to the traveler's departure airport and is valid until their travel date." },
              { step: "4", title: "Share Vouchers with Travelers", desc: "Use the DutyCredits dashboard to view all generated vouchers. You can share a direct link (dutyboost.com/voucher) with your customers so they can look up their DutyCredit using their booking ID." },
              { step: "5", title: "Track Commissions", desc: "Your dashboard shows all issued vouchers, redemption statistics, and commission reports. Download monthly commission PDFs directly from the Vouchers page." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 bg-card border border-border rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                <div>
                  <p className="font-semibold text-sm mb-1">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Retailers */}
        <section id="retailers" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-bold">3. Guide for Airport Retailers</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Airport retailers use DutyBoost to attract travelers with DutyCredit vouchers and drive in-store purchases.
          </p>
          <div className="space-y-3">
            {[
              { step: "1", title: "Sign Up & Get Approved", desc: "Go to dutyboost.com and click 'Get Started'. Select 'Airport Retailer', fill in your store details, choose your billing preference (credit card, iDEAL, or Monthly Invoice), and accept the terms." },
              { step: "2", title: "Access Your Retailer Dashboard", desc: "Once approved, log in at dutyboost.com. Your dashboard shows active vouchers at your airport, transaction history, and revenue reports." },
              { step: "3", title: "Scan Vouchers at Checkout", desc: "When a traveler presents a DutyCredit, navigate to the 'Scan & Redeem' page from your dashboard. Use your device camera to scan the QR code on the traveler's screen, or enter the voucher code manually. The system validates the voucher instantly." },
              { step: "4", title: "Enter the Purchase Amount", desc: "After scanning, enter the total purchase amount. Note: DutyCredits can only be redeemed on purchases of €50 or more — the system will block redemption for lower amounts. DutyBoost calculates the discount automatically based on the voucher's percentage. Confirm to complete the redemption." },
              { step: "5", title: "Monthly Billing", desc: "If you chose Monthly Invoice billing, you will receive an invoice on the 1st of each month. Payment is due within 14 days. Your dashboard shows your outstanding and paid invoices at all times." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 bg-card border border-border rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                <div>
                  <p className="font-semibold text-sm mb-1">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Travelers */}
        <section id="travelers" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-bold">4. Guide for Travelers</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            As a traveler, you don't need an account. Your DutyCredit is linked to your booking ID.
          </p>
          <div className="space-y-3">
            {[
              { step: "1", title: "Receive Your DutyCredit", desc: "After booking a flight through a participating travel agency, you'll receive your DutyCredit automatically. Your travel agency will share the link or send it via email." },
              { step: "2", title: "Look Up Your Voucher", desc: "Visit dutyboost.com/voucher and enter your booking ID to retrieve your DutyCredit QR code." },
              { step: "3", title: "Shop at the Airport", desc: "At a participating DutyBoost retailer, show the QR code on your screen. The cashier will scan it to apply your discount instantly at checkout. Your purchase must be €50 or more for the DutyCredit to be accepted." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 bg-card border border-border rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                <div>
                  <p className="font-semibold text-sm mb-1">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Install */}
        <section id="mobile" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-bold">5. Installing DutyBoost on Your Mobile Device</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            DutyBoost works as a Progressive Web App (PWA) — you can install it directly to your home screen without visiting an app store. This gives you a full app experience with quick access from your phone.
          </p>

          {/* iPhone */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg viewBox="0 0 814 1000" className="w-5 h-5" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.4-317.9 268.2-317.9 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>
              </div>
              <h3 className="font-heading font-semibold text-base">iPhone (Safari)</h3>
            </div>
            <ol className="space-y-3">
              {[
                "Open Safari on your iPhone and go to dutyboost.com.",
                "Tap the Share button — the square with an arrow pointing up — at the bottom of the screen.",
                "Scroll down in the share sheet and tap 'Add to Home Screen'.",
                "Give it a name (e.g. DutyBoost) and tap 'Add' in the top-right corner.",
                "DutyBoost now appears as an icon on your home screen. Tap it to open the app.",
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  {text}
                </li>
              ))}
            </ol>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <strong>Tip:</strong> Make sure to use Safari — other browsers on iPhone (Chrome, Firefox) do not support the 'Add to Home Screen' feature.
            </div>
          </div>

          {/* Android / Samsung */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <h3 className="font-heading font-semibold text-base">Android / Samsung Phone (Chrome)</h3>
            </div>
            <ol className="space-y-3">
              {[
                "Open Google Chrome on your Android or Samsung phone and go to dutyboost.com.",
                "Tap the three-dot menu (⋮) in the top-right corner of the browser.",
                "Tap 'Add to Home screen' or 'Install app' (the option may vary by device and Chrome version).",
                "Confirm by tapping 'Add' or 'Install' in the prompt that appears.",
                "DutyBoost is now installed on your home screen. You can also find it in your app drawer.",
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  {text}
                </li>
              ))}
            </ol>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">
              <strong>Tip:</strong> On Samsung phones you can also use Samsung Internet browser — tap the menu icon and select 'Add page to' → 'Home screen'.
            </div>
          </div>

          <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-primary">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Once installed, DutyBoost opens in full-screen mode just like a native app — no browser bar, faster loading, and works great for scanning vouchers at the point of sale.</span>
          </div>
        </section>

        {/* Help */}
        <section className="bg-card border border-border rounded-2xl p-8 text-center space-y-3">
          <h3 className="font-heading font-semibold text-lg">Need More Help?</h3>
          <p className="text-sm text-muted-foreground">Browse our FAQ or contact our support team directly.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/faq" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors">
              Browse FAQ <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="mailto:hello@dutyboost.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Email Support <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6 mt-10 bg-transparent">
        <div className="max-w-4xl mx-auto text-center text-xs text-muted-foreground">
          <p>© 2026 DutyBoost B.V. — All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}