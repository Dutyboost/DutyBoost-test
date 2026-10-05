// Layout foundation for the Trinidad & Tobago retailer slides.
// Same slide language as the rest of the deck: light canvas, purple accent.

export const ACCENT = "#952d8b";

export function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">
      {children}
    </div>
  );
}

export function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(rgba(149,45,139,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(149,45,139,0.5) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}