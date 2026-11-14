const qrUrl = (token) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(token)}`;

export default function PartnerPassCard({ token, brand, tagline, tiles }) {
  return (
    <div className="h-full flex flex-col bg-white border-2 border-primary rounded-2xl overflow-hidden">
      <div className="bg-primary text-primary-foreground px-4 py-3 text-center">
        <p className="text-[10px] uppercase tracking-widest opacity-80">DutyBoost DutyCredit</p>
        <p className="text-base font-bold font-mono mt-1">{token}</p>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <img
          src={qrUrl(token)}
          alt={`DutyCredit QR for ${brand}`}
          className="w-32 h-32 rounded-xl border border-border mx-auto"
        />

        <div className="grid grid-cols-2 gap-2 text-xs">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className={`bg-muted/50 rounded-lg p-2.5 ${tile.wide ? 'col-span-2' : ''}`}
            >
              <p className="text-[11px] leading-snug text-muted-foreground mb-1">{tile.label}</p>
              <p className={`font-semibold leading-snug break-words pb-1 ${tile.valueClass || ''}`}>{tile.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto w-full text-center pt-3 border-t border-border">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Brought to you by</p>
          <p className="text-2xl font-heading font-bold text-primary mt-1 break-words leading-tight">
            {brand}
          </p>
          <p className="text-xs font-medium text-foreground mt-1">{tagline}</p>
        </div>
      </div>
    </div>
  );
}