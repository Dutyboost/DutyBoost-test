export default function DutyBoostLogo({ height = 36, inverted = false }) {
  return (
    <img
      src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/6f22beb8c_ChatGPTImageMar29202611_56_41PM.png"
      alt="DutyBoost"
      style={{
        height: `${height}px`,
        width: "auto",
        mixBlendMode: inverted ? "normal" : "multiply",
        filter: inverted ? "brightness(0) invert(1)" : "none",
      }}
      className="object-contain"
    />
  );
}