import { motion } from "framer-motion";

interface RainbowBarProps {
  className?: string;
}

const RainbowBar = ({ className = "" }: RainbowBarProps) => (
  <div className={`rainbow-bar w-full ${className}`} style={className.includes('h-[') ? { height: undefined } : undefined} />
);

export default RainbowBar;
