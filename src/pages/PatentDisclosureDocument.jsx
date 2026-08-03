import { useState, useRef } from "react";
import { Printer, Download, FileText } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BLUE = "#1a56ff";
const DARK = "#0a1628";

function DutyBoostLogoText({ size = 28 }) {
  const px = `${size}px`;
  return (
    <span
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: px,
        lineHeight: 1,
        letterSpacing: "-0.02em",
        display: "inline-flex",
        alignItems: "baseline",
        gap: "2px",
      }}
    >
      <span style={{ color: DARK }}>Duty</span>
      <span style={{ color: BLUE }}>Boost</span>
      <span style={{ color: BLUE, fontSize: `${Math.round(size * 0.4)}px`, marginLeft: "1px", fontWeight: 600 }}>™</span>
    </span>
  );
}

export default function PatentDisclosureDocument() {
  const docRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const handlePrint = () => window.print();

  const handleExportPdf = async () => {
    if (!docRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(docRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      pdf.save("DutyBoost-Patent-Disclosure-Document.pdf");
    } catch (err) {
      console.error("PDF export error:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/* Toolbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5" style={{ color: BLUE }} />
            <span className="font-heading font-semibold text-sm" style={{ color: DARK }}>
              Patent Disclosure Document
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>
            <button
              onClick={handleExportPdf}
              disabled={exporting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors disabled:opacity-50"
              style={{ background: BLUE }}
            >
              <Download className="w-3.5 h-3.5" /> {exporting ? "Generating…" : "Download PDF"}
            </button>
          </div>
        </div>
      </div>

      {/* Document */}
      <div ref={docRef} className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none px-12 py-16 print:px-0 print:py-0">
        {/* Header */}
        <div className="border-b-2 pb-6 mb-10" style={{ borderColor: BLUE }}>
          <div className="flex items-center justify-between mb-6">
            <DutyBoostLogoText size={28} />
            <div className="text-right text-xs text-gray-500">
              <p className="font-semibold text-gray-700">CONFIDENTIAL</p>
              <p>Prepared for Patent Counsel</p>
            </div>
          </div>
          <h1 className="text-2xl font-heading font-bold mb-2" style={{ color: DARK }}>
            Invention Disclosure Document
          </h1>
          <h2 className="text-lg font-heading text-gray-600 mb-4">
            Travel Retail Circular Revenue Ecosystem
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-semibold text-gray-700">Applicant:</span> DutyBoost B.V.</p>
              <p><span className="font-semibold text-gray-700">Inventor:</span> Raël Martis, Co-Founder</p>
            </div>
            <div>
              <p><span className="font-semibold text-gray-700">Date:</span> August 2026</p>
              <p><span className="font-semibold text-gray-700">Document Type:</span> Invention Disclosure for Patentability Assessment</p>
            </div>
          </div>
        </div>

        {/* Section 1: Background */}
        <Section number="1" title="Background of the Invention">
          <SubSection title="1.1 Field of the Invention">
            <p>
              The present invention relates generally to computer-implemented commercial systems for the travel retail industry.
              More specifically, it relates to a computer-implemented ecosystem and method that enables multiple independent
              organisations — including travel partners (airlines, online travel agencies, accommodation providers, car rental
              companies, cruise operators, train operators), airport retailers, enterprise point-of-sale (POS) system providers,
              and travellers — to participate in, validate, and automatically share commercial value generated by verified
              airport retail transactions through a single transaction lifecycle.
            </p>
          </SubSection>
          <SubSection title="1.2 Description of the Related Art">
            <p>
              The travel retail industry comprises numerous independent participants that collectively contribute to a traveller's
              journey. Travel partners (airlines, OTAs, hotels, car rental companies, cruise lines, train operators) generate
              passenger traffic but receive no financial benefit from airport retail purchases made by the travellers they refer.
              Airport retailers must independently invest in customer acquisition with no shared infrastructure. Enterprise POS
              providers merely process transactions without participating in commercial value creation. Marketing campaigns
              terminate once a traveller arrives at the airport — the single most commercially valuable moment in the journey.
            </p>
            <p className="mt-3">
              Existing solutions address only one participant in isolation: loyalty programmes serve a single retailer or airline;
              commission systems are bilateral (two-party); airport marketing platforms deliver advertisements but do not link
              them to verified transactions; and POS systems record sales without attributing them to a referring travel partner.
              No known system or method connects all participants into a single, computer-implemented revenue cycle in which one
              verified retail transaction automatically generates and distributes commercial value to multiple unrelated
              organisations according to predefined business rules.
            </p>
          </SubSection>
          <SubSection title="1.3 Problem to be Solved">
            <p>
              There is therefore a need for an independent commercial operating layer that: (a) issues digital credentials to
              travellers before airport arrival via travel partners; (b) validates those credentials at the point of sale through
              enterprise POS integration; (c) attributes each verified transaction to its originating travel partner; (d)
              calculates and distributes commercial entitlements among all participating organisations automatically; and (e) creates
              a self-reinforcing incentive cycle in which each transaction encourages further traveller activation.
            </p>
          </SubSection>
        </Section>

        {/* Section 2: Summary */}
        <Section number="2" title="Summary of the Invention">
          <p>
            According to one aspect of the present invention, there is provided a computer-implemented method for operating a
            travel retail circular revenue ecosystem, the method comprising the steps of:
          </p>
          <ol className="list-decimal list-outside ml-5 mt-3 space-y-2">
            <li>
              <span className="font-semibold">Credential Issuance:</span> Receiving, at a platform server, booking data from a
              travel partner system, the booking data comprising at least a booking identifier, a total ticket price, a number
              of travellers, a travel type (short-haul or long-haul), a departure airport, a travel date, and a traveller email
              address;
            </li>
            <li>
              <span className="font-semibold">Credit Calculation:</span> Automatically calculating a digital credit amount based
              on said booking data using a tiered calculation model, the model applying a per-traveller base amount determined by
              travel type, multiplied by a ticket-price-derived multiplier, clamped between a predefined floor and a predefined cap;
            </li>
            <li>
              <span className="font-semibold">Duplicate Prevention:</span> Querying a booking database for an existing record
              matching said booking identifier and, if found, rejecting the request to prevent duplicate credential issuance;
            </li>
            <li>
              <span className="font-semibold">Credential Generation:</span> Generating a unique credential code, a corresponding
              machine-readable code (QR code), and an expiration date derived from said travel date; persisting said credential
              in a credential database with a status of "active"; and transmitting said credential to the traveller via electronic
              communication;
            </li>
            <li>
              <span className="font-semibold">POS Validation:</span> Receiving, at said platform server, a transaction request from
              a retailer POS system, the request comprising said credential code, a transaction value, a retailer identifier, and
              a store name; authenticating said POS system using a shared secret;
            </li>
            <li>
              <span className="font-semibold">Credential Verification:</span> Querying said credential database for said credential
              code; verifying that said credential status is "active"; verifying that said credential has not expired; and if
              expired, updating said status to "expired";
            </li>
            <li>
              <span className="font-semibold">Discount Calculation:</span> Calculating a progressive discount amount from said
              transaction value using a piecewise-linear breakpoint model, said model mapping basket-value ranges to discount
              percentages via linear interpolation between predefined breakpoints, and computing an effective discount percentage;
            </li>
            <li>
              <span className="font-semibold">Multi-Party Settlement:</span> Automatically calculating a platform fee as a
              percentage of said transaction value, capped at a maximum amount and waived above a threshold; calculating a travel
              partner commission as a share of said platform fee, capped at a maximum amount; and determining an amount due from
              the traveller;
            </li>
            <li>
              <span className="font-semibold">Transaction Logging:</span> Persisting said transaction with said discount amount,
              said effective discount percentage, said platform fee, said travel partner commission, and an association to said
              originating travel partner via a partner email identifier; and marking said credential as "redeemed";
            </li>
            <li>
              <span className="font-semibold">Result Transmission:</span> Transmitting a transaction breakdown to said POS system
              for receipt printing, said breakdown comprising the gross value, effective discount percentage, discount amount,
              amount due, platform fee, and travel partner commission.
            </li>
          </ol>
          <p className="mt-3">
            According to further aspects, the invention provides a system comprising a platform server, a credential database, a
            booking database, a transaction database, and communication interfaces to travel partner systems and retailer POS
            systems, configured to execute the method above; and a computer-readable medium storing instructions that, when
            executed, cause a processor to perform said method.
          </p>
        </Section>

        {/* Section 3: Detailed Description */}
        <Section number="3" title="Detailed Technical Description">
          <SubSection title="3.1 System Architecture">
            <p>
              The system comprises a central platform server operatively connected to: (a) a credential database storing digital
              credit records (DutyCredit tokens / vouchers), each record comprising a unique credential code, a booking
              identifier, a discount percentage or credit amount, a departure airport, an expiration date, a status field, a
              traveller count, a ticket price, a travel type, a travel partner email identifier, and a traveller email identifier;
              (b) a booking database storing travel booking records for duplicate-prevention; (c) a transaction database storing
              verified retail transaction records; (d) a retailer database storing participating airport retailer records; and
              (e) communication interfaces for inbound API calls from travel partner systems and retailer POS systems.
            </p>
            <p className="mt-3">
              Access control is enforced through row-level security policies: credential records and transaction records are
              readable only by the originating travel partner (matching their authenticated email) or by platform administrators;
              creation, update, and deletion of transaction records is restricted to platform administrators. Travel partner
              systems are authenticated via session tokens; retailer POS systems are authenticated via a shared secret transmitted
              in a request header.
            </p>
          </SubSection>

          <SubSection title="3.2 Credit Calculation Engine">
            <p>
              The credit calculation engine computes the initial digital credit amount issued to a traveller at the time of
              booking. The engine receives booking data and applies the following formula:
            </p>
            <div className="my-4 p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm">
              credit = clamp(basePerTraveller × numberOfTravellers × multiplier, floor, cap)
            </div>
            <p className="mt-2">
              Wherein <code>basePerTraveller</code> is determined by travel type (a first value for short-haul flights, a second
              higher value for long-haul flights); <code>multiplier</code> is determined by ticket price (a first
              multiplier below a first threshold, a second multiplier at a second threshold, a third multiplier at a third
              threshold, a fourth multiplier at a fourth threshold); and the result is clamped between a predefined floor and a
              predefined cap. The engine generates a unique credential code in a predetermined format and derives an expiration
              date by adding a predefined validity period to the departure date.
            </p>
          </SubSection>

          <SubSection title="3.3 Progressive Discount Model">
            <p>
              At the point of sale, the system applies a progressive discount model that maps the traveller's basket value to a
              discount percentage using piecewise-linear interpolation between predefined breakpoints. The breakpoints define
              a monotonically increasing function: a minimum spend threshold yields a first
              percentage, and progressively higher thresholds yield higher percentages up to a maximum percentage at a maximum
              breakpoint and above.
            </p>
            <p className="mt-3">
              For basket values falling between two adjacent breakpoints, the effective percentage is computed by linear
              interpolation. The discount amount equals the product of the basket value and the effective percentage. The
              effective discount percentage is derived by dividing the discount amount by the basket value.
            </p>
            <div className="my-4 p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs">
              For basket B between breakpoints (S₁, P₁) and (S₂, P₂):<br/>
              t = (B − S₁) / (S₂ − S₁)<br/>
              effective_pct = P₁ + t × (P₂ − P₁)<br/>
              discount = B × effective_pct
            </div>
          </SubSection>

          <SubSection title="3.4 Multi-Party Settlement Engine">
            <p>
              Upon validation of a credential and calculation of the discount, the settlement engine computes the commercial
              entitlements of each participating organisation:
            </p>
            <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
              <li><span className="font-semibold">Platform fee:</span> a first percentage of the transaction value, capped at a maximum amount, and waived entirely above a high-value threshold.</li>
              <li><span className="font-semibold">Travel partner commission:</span> a predefined share of said platform fee, capped at a maximum amount, attributed to the originating travel partner identified by the credential's partner email identifier.</li>
              <li><span className="font-semibold">Amount due from traveller:</span> the transaction value minus the discount amount.</li>
            </ul>
            <p className="mt-3">
              Each verified transaction is persisted with its full financial breakdown and the association to its originating
              travel partner, enabling per-partner revenue reporting, aggregated dashboards, and automated monthly payout
              calculations.
            </p>
          </SubSection>

          <SubSection title="3.5 POS Integration and Transaction Validation Workflow">
            <p>
              The POS integration endpoint receives transaction requests from retailer POS systems in real time. The workflow
              comprises: (a) authenticating the POS system via a shared secret; (b) validating the presence of required fields
              (credential code, transaction value, retailer identifier); (c) querying the credential database and verifying
              active status and non-expiry; (d) enforcing a minimum basket threshold; (e) calculating the progressive discount
              and settlement amounts; (f) persisting the transaction record; (g) marking the credential as redeemed to enforce
              single-use; and (h) returning a structured response to the POS system for receipt printing.
            </p>
          </SubSection>

          <SubSection title="3.6 Partial Refund and Transaction Adjustment">
            <p>
              The system further comprises a refund processing method for handling partial or full returns of goods after a
              redemption. When a traveller returns goods, the method: (a) retrieves the original transaction record; (b) computes
              an adjusted basket value by subtracting the refund amount and any previously refunded amounts from the original
              transaction value; (c) recalculates the progressive discount for the adjusted basket using said breakpoint model;
              (d) recalculates the platform fee and travel partner commission for the adjusted basket; (e) computes a refund due
              to the traveller equal to the returned goods value minus the discount adjustment (original discount minus new
              discount); (f) updates the transaction record with adjusted values and a refund status (partial or full); and (g)
              returns the adjusted breakdown to the POS system.
            </p>
            <div className="my-4 p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs">
              refundDueToTraveler = refundAmount − (originalDiscount − newDiscount)
            </div>
          </SubSection>

          <SubSection title="3.7 Self-Reinforcing Incentive Cycle">
            <p>
              Each verified transaction creates incentives for further traveller activation: the travel partner receives a
              commission, demonstrating the commercial value of participation and encouraging further credential issuance; the
              retailer gains a customer acquisition without independent investment; the traveller receives a tangible discount,
              encouraging repeat usage; and the platform sustains the ecosystem. This constitutes a circular — not linear —
              commercial model.
            </p>
          </SubSection>

          <SubSection title="3.8 Core Algorithms">
            <p>
              The following algorithms constitute the technical core of the invention. Each algorithm is presented in formal
              pseudocode and is referenced by the corresponding step in the method of Section 2.
            </p>

            {/* Algorithm A */}
            <div className="mt-5 print:break-before-page">
              <h4 className="font-heading font-semibold text-sm mb-2" style={{ color: DARK }}>
                Algorithm A — Credential Credit Calculation
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Executed upon receipt of booking data from a travel partner system. Computes the digital credit amount issued to
                a traveller before airport arrival.
              </p>
              <CodeBlock>{`ALGORITHM A: CalculateDutyCredit
INPUT:  ticketPrice ∈ ℝ⁺, travelers ∈ ℤ⁺, travelType ∈ {Short-haul, Long-haul}
OUTPUT: creditAmount ∈ [floor, cap]

1.  IF travelType = Long-haul THEN
2.      base ← LONG_HAUL_BASE
3.  ELSE
4.      base ← SHORT_HAUL_BASE
5.  END IF
6.
7.  IF ticketPrice ≥ THRESHOLD_4 THEN multiplier ← MULTIPLIER_4
8.  ELSE IF ticketPrice ≥ THRESHOLD_3 THEN multiplier ← MULTIPLIER_3
9.  ELSE IF ticketPrice ≥ THRESHOLD_2 THEN multiplier ← MULTIPLIER_2
10. ELSE multiplier ← MULTIPLIER_1
11. END IF
12.
13. raw ← base × travelers × multiplier
14. creditAmount ← max(FLOOR, min(raw, CAP))
15. RETURN creditAmount

CONSTANTS:
  SHORT_HAUL_BASE, LONG_HAUL_BASE: predefined per-traveller base amounts
  THRESHOLD_1 < THRESHOLD_2 < THRESHOLD_3 < THRESHOLD_4: predefined ticket-price thresholds
  MULTIPLIER_1 < MULTIPLIER_2 < MULTIPLIER_3 < MULTIPLIER_4: predefined multipliers
  FLOOR, CAP: predefined minimum and maximum credit bounds`}</CodeBlock>
            </div>

            {/* Algorithm B */}
            <div className="mt-5 print:break-before-page">
              <h4 className="font-heading font-semibold text-sm mb-2" style={{ color: DARK }}>
                Algorithm B — Credential Generation and Issuance
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Generates a unique credential code, derives an expiration date, persists the credential, and transmits it to the
                traveller. Includes duplicate-booking prevention.
              </p>
              <CodeBlock>{`ALGORITHM B: GenerateCredential
INPUT:  bookingId, ticketPrice, travelers, travelType,
        departureAirport, travelDate, travelerEmail, partnerEmail
OUTPUT: {voucherCode, creditAmount, expirationDate, qrImageUrl}

1.  // — Duplicate prevention —
2.  existing ← Query(BookingDB, booking_id = bookingId)
3.  IF existing ≠ ∅ THEN
4.      RETURN Error("Credential already issued for this booking")
5.  END IF
6.
7.  // — Credit calculation —
8.  creditAmount ← CalculateDutyCredit(ticketPrice, travelers, travelType)
9.
10. // — Unique code generation —
11. charset ← "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
12. voucherCode ← "DB-"
13. FOR i ← 1 TO 8 DO
14.     voucherCode ← voucherCode + charset[random(0, |charset|−1)]
15. END FOR
16.
17. // — Expiration derivation —
18. expirationDate ← travelDate + VALIDITY_PERIOD
19.
20. // — Persist booking record —
21. BookingDB.create(bookingId, ticketPrice, travelers, travelType,
22.                   departureAirport, travelDate, partnerEmail, travelerEmail)
23.
24. // — Persist credential record —
25. CredentialDB.create(voucherCode, bookingId, creditAmount,
26.                      departureAirport, expirationDate, status="active",
27.                      partnerEmail, travelerEmail)
28.
29. // — Generate QR code —
30. qrImageUrl ← QRCodeService.generate(voucherCode)
31.
32. // — Transmit to traveller —
33. EmailService.send(travelerEmail, voucherCode, qrImageUrl,
34.                   creditAmount, departureAirport, travelDate, expirationDate)
35.
36. RETURN {voucherCode, creditAmount, expirationDate, qrImageUrl}`}</CodeBlock>
            </div>

            {/* Algorithm C */}
            <div className="mt-5 print:break-before-page">
              <h4 className="font-heading font-semibold text-sm mb-2" style={{ color: DARK }}>
                Algorithm C — Progressive Piecewise-Linear Discount Calculation
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Maps a basket value to a discount amount using piecewise-linear interpolation between predefined breakpoints.
                Executed at the point of sale when a traveller presents a credential.
              </p>
              <CodeBlock>{`ALGORITHM C: CalcBasketCredit
INPUT:  basketValue B ∈ ℝ⁺
OUTPUT: discountAmount ∈ ℝ

1.  IF B < MIN_BASKET THEN
2.      RETURN 0
3.  END IF
4.
5.  IF B ≥ MAX_BREAKPOINT THEN
6.      RETURN round(B × MAX_PCT, 2)
7.  END IF
8.
9.  // — Identify adjacent breakpoints —
10. FOR i ← 0 TO |BREAKPOINTS| − 2 DO
11.     IF B ≥ BREAKPOINTS[i].spend AND B < BREAKPOINTS[i+1].spend THEN
12.         lower ← BREAKPOINTS[i]
13.         upper ← BREAKPOINTS[i+1]
14.         BREAK
15.     END IF
16. END FOR
17.
18. // — Linear interpolation —
19. t ← (B − lower.spend) / (upper.spend − lower.spend)
20. effectivePct ← lower.pct + t × (upper.pct − lower.pct)
21. discountAmount ← round(B × effectivePct, 2)
22. RETURN discountAmount

BREAKPOINTS = [
  (S₁, P₁), (S₂, P₂), (S₃, P₃), (S₄, P₄),
  (S₅, P₅), (S₆, P₆), (S₇, P₇)
]
where S₁ < S₂ < ... < S₇ (predefined spend thresholds)
and   P₁ < P₂ < ... < P₇ (predefined discount percentages, monotonically increasing)
MIN_BASKET, MAX_BREAKPOINT, MAX_PCT: predefined system parameters`}</CodeBlock>
            </div>

            {/* Algorithm D */}
            <div className="mt-5 print:break-before-page">
              <h4 className="font-heading font-semibold text-sm mb-2" style={{ color: DARK }}>
                Algorithm D — Multi-Party Settlement
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Computes the commercial entitlements of all participating organisations from a single verified transaction value.
                Executed atomically with Algorithm C during POS validation.
              </p>
              <CodeBlock>{`ALGORITHM D: MultiPartySettlement
INPUT:  txnValue T ∈ ℝ⁺, voucher (contains partnerEmail)
OUTPUT: {discountAmount, effectiveDiscountPct, platformFee,
         partnerCommission, amountDue}

1.  // — Discount (Algorithm C) —
2.  discountAmount ← CalcBasketCredit(T)
3.  effectiveDiscountPct ← round(discountAmount / T × 100, 2)
4.
5.  // — Platform fee —
6.  IF T > FEE_WAIVER_THRESHOLD THEN
7.      platformFee ← 0
8.  ELSE
9.      platformFee ← round(min(T × FEE_PCT, FEE_CAP), 2)
10. END IF
11.
12. // — Travel partner commission —
13. partnerCommission ← round(min(platformFee × COMMISSION_SHARE,
14.                                COMMISSION_CAP), 2)
15.
16. // — Amount due from traveller —
17. amountDue ← round(T − discountAmount, 2)
18.
19. RETURN {discountAmount, effectiveDiscountPct,
20.          platformFee, partnerCommission, amountDue}

CONSTANTS:
  FEE_PCT: predefined platform fee percentage
  FEE_CAP: predefined maximum platform fee per transaction
  FEE_WAIVER_THRESHOLD: predefined threshold above which fee is waived
  COMMISSION_SHARE: predefined share of platform fee allocated to travel partner
  COMMISSION_CAP: predefined maximum travel partner commission per transaction`}</CodeBlock>
            </div>

            {/* Algorithm E */}
            <div className="mt-5 print:break-before-page">
              <h4 className="font-heading font-semibold text-sm mb-2" style={{ color: DARK }}>
                Algorithm E — POS Transaction Validation and Redemption Workflow
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                The end-to-end workflow executed when a retailer POS system submits a transaction request. Validates the
                credential, enforces single-use, calculates settlement, persists the transaction, and returns the result.
              </p>
              <CodeBlock>{`ALGORITHM E: POSTransactionWorkflow
INPUT:  voucherCode V, txnValue T, retailerId R, storeName S,
        airport A, posSecret K
OUTPUT: TransactionResult | Error

1.  // — Authentication —
2.  IF K ≠ STORED_POS_SECRET THEN RETURN Error("Unauthorized")
3.
4.  // — Field validation —
5.  IF V = ∅ OR T = ∅ OR R = ∅ THEN RETURN Error("Missing fields")
6.
7.  // — Credential lookup —
8.  voucher ← CredentialDB.filter(voucherCode = V)
9.  IF voucher = ∅ THEN RETURN Error("Voucher not found")
10.
11. // — Status check —
12. IF voucher.status ≠ "active" THEN
13.     RETURN Error("Voucher is " + voucher.status)
14. END IF
15.
16. // — Expiry check —
17. IF voucher.expirationDate < currentDate THEN
18.     CredentialDB.update(voucher.id, status = "expired")
19.     RETURN Error("Voucher has expired")
20. END IF
21.
22. // — Minimum basket enforcement —
23. IF T < MIN_BASKET THEN RETURN Error("Minimum basket not met")
24.
25. // — Settlement (Algorithms C + D) —
26. result ← MultiPartySettlement(T, voucher)
27.
28. // — Transaction logging —
29. txnId ← TransactionDB.create(
30.     voucherCode = V, retailerId = R, storeName = S,
31.     transactionValue = T,
32.     baseDiscount = voucher.discountAmount,
33.     effectiveDiscount = result.effectiveDiscountPct,
34.     discountAmount = result.discountAmount,
35.     platformRevenue = result.platformFee,
36.     partnerCommission = result.partnerCommission,
37.     partnerEmail = voucher.partnerEmail,
38.     airport = A
39. )
40.
41. // — Single-use enforcement —
42. CredentialDB.update(voucher.id, status = "redeemed")
43.
44. // — Return breakdown to POS —
45. RETURN {txnId, V, grossValue: T,
46.          effectiveDiscountPct: result.effectiveDiscountPct,
47.          discountAmount: result.discountAmount,
48.          amountDue: result.amountDue,
49.          platformFee: result.platformFee,
50.          partnerCommission: result.partnerCommission}`}</CodeBlock>
            </div>

            {/* Algorithm F */}
            <div className="mt-5 print:break-before-page">
              <h4 className="font-heading font-semibold text-sm mb-2" style={{ color: DARK }}>
                Algorithm F — Partial Refund Recalculation
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Handles partial or full returns of goods after a redemption. Recalculates the discount, platform fee, and partner
                commission for the adjusted basket, and computes the refund due to the traveller.
              </p>
              <CodeBlock>{`ALGORITHM F: ProcessPartialRefund
INPUT:  transactionId TxnId, refundAmount F ∈ ℝ⁺, posSecret K
OUTPUT: RefundResult | Error

1.  // — Authentication —
2.  IF K ≠ STORED_POS_SECRET THEN RETURN Error("Unauthorized")
3.
4.  // — Retrieve original transaction —
5.  txn ← TransactionDB.get(TxnId)
6.  IF txn = ∅ THEN RETURN Error("Transaction not found")
7.
8.  // — Check prior refunds —
9.  IF txn.refundStatus = "full" THEN
10.     RETURN Error("Already fully refunded")
11. END IF
12.
13. // — Compute adjusted basket —
14. alreadyRefunded ← txn.refundedAmount ∨ 0
15. remainingBasket ← txn.transactionValue − alreadyRefunded
16.
17. IF F > remainingBasket THEN
18.     RETURN Error("Refund exceeds remaining basket")
19. END IF
20.
21. newBasket ← remainingBasket − F
22.
23. // — Recalculate discount for adjusted basket —
24. originalDiscount ← txn.discountAmount
25. newDiscount ← CalcBasketCredit(newBasket)
26.
27. // — Recalculate platform fee and partner commission —
28. IF newBasket > FEE_WAIVER_THRESHOLD THEN
29.     newPlatformFee ← 0
30. ELSE
31.     newPlatformFee ← min(newBasket × FEE_PCT, FEE_CAP)
32. END IF
33. newPartnerCommission ← min(newPlatformFee × COMMISSION_SHARE,
34.                             COMMISSION_CAP)
35.
36. // — Refund due to traveller —
37. discountAdjustment ← originalDiscount − newDiscount
38. refundDueToTraveler ← F − discountAdjustment
39.
40. // — Determine refund status —
41. totalRefunded ← alreadyRefunded + F
42. IF totalRefunded ≥ txn.transactionValue THEN
43.     refundStatus ← "full"
44. ELSE
45.     refundStatus ← "partial"
46. END IF
47.
48. // — Update transaction record —
49. TransactionDB.update(TxnId, {
50.     refundStatus, refundedAmount: totalRefunded,
51.     adjustedTransactionValue: newBasket,
52.     adjustedDiscountAmount: newDiscount,
53.     adjustedPlatformRevenue: newPlatformFee,
54.     refundDueToTraveler
55. })
56.
57. RETURN {originalBasket: txn.transactionValue, refundAmount: F,
58.          newBasket, originalDiscount, newDiscount,
59.          discountAdjustment, refundDueToTraveler,
60.          originalPlatformFee: txn.platformRevenue,
61.          newPlatformFee, refundStatus}`}</CodeBlock>
            </div>
          </SubSection>
        </Section>

        {/* Section 4: Novel Aspects */}
        <Section number="4" title="Aspects Believed to be Novel">
          <p className="mb-4">
            The following aspects are believed to be novel and non-obvious over the prior art and are submitted for patentability
            assessment:
          </p>
          <div className="space-y-4">
            <AspectItem num="4.1" title="Travel Retail Circular Revenue Ecosystem">
              A computer-implemented commercial ecosystem enabling multiple independent organisations to participate in revenue
              from a single verified airport retail transaction, wherein said organisations include travel partners, airport
              retailers, and POS system providers that previously operated independently.
            </AspectItem>
            <AspectItem num="4.2" title="Multi-Party Transaction Attribution">
              A single retail transaction automatically attributed to multiple independent commercial participants based on
              predefined relationships encoded in a credential record — unlike traditional two-party commission or single-party
              loyalty systems.
            </AspectItem>
            <AspectItem num="4.3" title="Automated Circular Revenue Distribution">
              One verified transaction automatically initiating calculation and allocation of commercial value among multiple
              unrelated organisations without manual intervention, using a settlement engine that computes platform fees,
              partner commissions, and traveller discounts in a single processing step.
            </AspectItem>
            <AspectItem num="4.4" title="Computer-Implemented Validation Workflow">
              A technical workflow verifying: traveller eligibility, credential validity, transaction authenticity, redemption
              uniqueness (single-use enforcement), originating partner identification, participating retailer authentication, and
              settlement eligibility — performed in a defined sequence before any commercial value is distributed.
            </AspectItem>
            <AspectItem num="4.5" title="Progressive Piecewise-Linear Discount with Multi-Party Settlement">
              The combination of a piecewise-linear progressive discount model with a multi-party settlement engine, wherein the
              discount percentage and the commercial entitlements of each party are derived from the same transaction value in a
              single atomic calculation, and wherein a partial refund triggers recalculation of both the discount and all party
              entitlements.
            </AspectItem>
            <AspectItem num="4.6" title="Ecosystem Operating Layer">
              Independent software infrastructure positioned between all ecosystem participants — enabling collaboration between
              organisations that previously operated independently — functioning neither as a retailer, a loyalty programme, a
              marketing platform, nor a payment platform, but as a commercial operating layer.
            </AspectItem>
          </div>
        </Section>

        {/* Section 5: Drawings */}
        <Section number="5" title="Brief Description of the Drawings">
          <p>
            The accompanying drawings (provided separately) illustrate embodiments of the invention:
          </p>
          <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
            <li><span className="font-semibold">Figure 1:</span> High-level system architecture showing the platform server, databases, travel partner systems, retailer POS systems, and traveller device.</li>
            <li><span className="font-semibold">Figure 2:</span> Transaction lifecycle flow diagram from credential issuance through redemption, validation, settlement, and value distribution.</li>
            <li><span className="font-semibold">Figure 3:</span> Progressive discount breakpoint model showing the piecewise-linear mapping of basket value to discount percentage.</li>
            <li><span className="font-semibold">Figure 4:</span> Multi-party settlement diagram showing the allocation of commercial value from a single transaction to platform, travel partner, retailer, and traveller.</li>
            <li><span className="font-semibold">Figure 5:</span> Partial refund adjustment workflow showing recalculation of discount and entitlements.</li>
            <li><span className="font-semibold">Figure 6:</span> Circular incentive cycle diagram illustrating the self-reinforcing commercial model.</li>
          </ul>
        </Section>

        {/* Section 6: Implementation */}
        <Section number="6" title="Best Mode / Implementation">
          <SubSection title="6.1 Implementation Mechanisms">
            <p>
              In the current best-mode implementation, the system is built on a cloud-based backend-as-a-service platform
              providing managed databases, server-side functions, authentication, and API endpoints. Travel partner integration
              is performed via a booking-submission API endpoint that accepts JSON payloads. Retailer POS integration is
              performed via a webhook endpoint secured by a shared secret transmitted in an HTTP header. Credentials are issued
              as alphanumeric codes with corresponding QR codes generated via a QR code generation service. Electronic
              communication of credentials to travellers is performed via an email service. The following technologies are
              implementation mechanisms only and are not claimed individually: REST APIs, enterprise POS systems, QR codes,
              secure authentication, cloud computing, mobile devices, transaction databases, and reporting engines.
            </p>
          </SubSection>
          <SubSection title="6.2 Data Model">
            <p>
              The system maintains the following principal data structures: a <span className="font-semibold">Booking</span> record
              (booking identifier, ticket price, traveller count, travel type, departure airport, travel date, return date, travel
              partner email, traveller email); a <span className="font-semibold">Credential/Voucher</span> record (credential code,
              booking identifier, discount amount, airport, expiration date, status, traveller count, ticket price, travel type,
              partner email, traveller email); a <span className="font-semibold">Transaction</span> record (credential code, retailer
              identifier, store name, transaction value, base discount, effective discount, discount amount, platform revenue,
              travel partner commission, partner email, airport, refund status, refunded amount, adjusted values); and a
              <span className="font-semibold"> Retailer</span> record (store name, airport, category, voucher acceptance flag,
              owner email, POS channel partner, commission rate).
            </p>
          </SubSection>
        </Section>

        {/* Section 7: Industrial Applicability */}
        <Section number="7" title="Industrial Applicability">
          <p>
            The invention finds application in the global travel retail industry, which comprises approximately 4,000 commercial
            airports, approximately 2,800 airports with duty-free retail operations, and approximately 45,000 retail stores,
            serving an estimated 4.8 billion annual passengers (approximately 9.6 billion annual departure moments including
            outbound and return legs). The system enables travel partners, airport retailers, and POS providers to collaborate
            through a shared commercial infrastructure without requiring any participant to abandon its existing systems or
            business model.
          </p>
        </Section>

        {/* Section 8: Questions */}
        <Section number="8" title="Questions for Patent Counsel">
          <ol className="list-decimal list-outside ml-5 space-y-2">
            <li>Is the Travel Retail Circular Revenue Ecosystem novel in view of existing patents and published prior art?</li>
            <li>Are there existing patents describing a comparable computer-implemented commercial operating system for travel retail?</li>
            <li>Does the combination of traveller activation, transaction validation, multi-party attribution, and automated circular revenue distribution constitute patentable subject matter under EPC Article 52 and/or 35 U.S.C. § 101?</li>
            <li>Which aspects of the invention appear to be novel and non-obvious, and which are likely considered prior art?</li>
            <li>Would protection be more appropriate as a system claim, computer-implemented method claim, business method claim, or a combination thereof?</li>
            <li>Should the invention be protected through one comprehensive application or multiple related patent families covering different technical aspects (e.g., the settlement engine, the validation workflow, the refund recalculation method)?</li>
            <li>What are the principal design-around risks, and how should the claims be drafted to mitigate them?</li>
          </ol>
        </Section>

        {/* Section 9: Requested Outcome */}
        <Section number="9" title="Requested Outcome">
          <ul className="list-disc list-outside ml-5 space-y-1">
            <li>Comprehensive novelty/patentability search against existing patents and published prior art.</li>
            <li>Legal opinion on novelty, inventive step, and likelihood of obtaining patent protection.</li>
            <li>Claim strategy recommendations (claim types, scope, dependent claims).</li>
            <li>Guidance on filing jurisdictions (EPO, USPTO, PCT, and/or national routes).</li>
            <li>Identification of prior art risks and design-around mitigations.</li>
            <li>Opportunities to maximise the scope of intellectual property protection.</li>
          </ul>
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <div className="mb-3 flex justify-center">
            <DutyBoostLogoText size={22} />
          </div>
          <p className="font-semibold text-gray-600">CONFIDENTIAL — INVENTION DISCLOSURE</p>
          <p>This document is confidential and prepared solely for patent counsel assessment.</p>
          <p className="mt-2">DutyBoost B.V. · Raël Martis, Co-Founder · August 2026</p>
        </div>
      </div>
    </div>
  );
}

function Section({ number, title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-heading font-bold mb-4 pb-2 border-b" style={{ color: DARK, borderColor: BLUE }}>
        <span style={{ color: BLUE }}>{number}.</span> {title}
      </h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function SubSection({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="font-heading font-semibold text-sm text-gray-800 mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function AspectItem({ num, title, children }) {
  return (
    <div className="border-l-2 pl-4" style={{ borderColor: BLUE }}>
      <h3 className="font-heading font-semibold text-sm mb-1" style={{ color: DARK }}>
        <span style={{ color: BLUE }}>{num}</span> — {title}
      </h3>
      <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
    </div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="my-3 p-4 rounded-lg border overflow-x-auto text-xs leading-relaxed font-mono" style={{ background: BLUE, color: "#ffffff", borderColor: BLUE }}>
{children}
    </pre>
  );
}