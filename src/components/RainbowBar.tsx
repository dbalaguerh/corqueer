const blockColors = [
  "hsl(var(--block-coral))",
  "hsl(var(--block-amber))",
  "hsl(var(--block-lime))",
  "hsl(var(--block-sky))",
  "hsl(var(--block-violet))",
  "hsl(var(--block-rose))",
];

interface RainbowBarProps {
  className?: string;
}

const RainbowBar = ({ className = "" }: RainbowBarProps) => (
  <div className={`flex w-full ${className}`} style={{ height: className.includes("h-[") ? undefined : "4px" }}>
    {blockColors.map((color, i) => (
      <div key={i} className="flex-1" style={{ backgroundColor: color }} />
    ))}
  </div>
);

export default RainbowBar;
