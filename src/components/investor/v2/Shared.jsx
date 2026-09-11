export function SlideWrapper({ children, dark }) {
  return (
    <div className={`w-full flex flex-col overflow-y-auto lg:overflow-hidden ${dark ? "bg-[#0a0f1e] text-white" : "bg-white text-[#0a0f1e]"}`}>
      {children}
    </div>
  );
}

export function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}