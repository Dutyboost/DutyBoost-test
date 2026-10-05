// Opportunity diagram: one hundred travellers crossing the concourse.
// The share who buy branches off into the stores; the rest carry on past them.
// The split is driven by the benchmark share, so the picture follows the number.

import { ACCENT } from "../Shared";

const COLS = 20;
const ROWS = 5;
const TOTAL = COLS * ROWS;

const dotX = (c) => 74 + c * 28;
const dotY = (r) => 166 + r * 24;

const SHOPS = [750, 852, 954];

export default function ConcourseSplit({ purchaseShare = 0.22, className = "" }) {
  const buying = Math.round(purchaseShare * TOTAL);

  // Colour the travellers nearest the stores, so the branch reads as a choice.
  const buyingCells = new Set();
  let counted = 0;
  for (let c = COLS - 1; c >= 0 && counted < buying; c--) {
    for (let r = 0; r < ROWS && counted < buying; r++) {
      buyingCells.add(`${c}-${r}`);
      counted++;
    }
  }

  const dots = [];
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      const isBuying = buyingCells.has(`${c}-${r}`);
      dots.push(
        <circle
          key={`${c}-${r}`}
          cx={dotX(c)}
          cy={dotY(r)}
          r="5"
          fill={isBuying ? ACCENT : "#cbd5e1"}
        />
      );
    }
  }

  return (
    <svg
      viewBox="0 0 1040 300"
      className={className}
      role="img"
      aria-label="One hundred travellers in the concourse, twenty-two of them buying"
    >
      {/* the concourse */}
      <rect x="50" y="150" width="650" height="130" rx="16" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
      {dots}

      {/* the branch into the stores */}
      <path d="M616,168 C660,150 700,100 748,100" fill="none" stroke={ACCENT} strokeWidth="3" />
      <polygon points="752,100 736,92 736,108" fill={ACCENT} />

      {/* the travellers who carry on past */}
      <path
        d="M706,240 L1012,240"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="3"
        strokeDasharray="8 8"
      />
      <polygon points="1020,240 1004,232 1004,248" fill="#94a3b8" />

      {/* the stores */}
      {SHOPS.map((x) => (
        <g key={x}>
          <rect x={x} y="36" width="80" height="16" rx="4" fill={ACCENT} />
          <rect x={x} y="52" width="80" height="94" rx="6" fill="#ffffff" stroke="#c7d8f2" strokeWidth="2" />
          <rect x={x + 10} y="62" width="60" height="44" rx="4" fill="#eaf2ff" />
          <rect x={x + 10} y="116" width="60" height="14" rx="3" fill="#dbeafe" />
        </g>
      ))}
    </svg>
  );
}