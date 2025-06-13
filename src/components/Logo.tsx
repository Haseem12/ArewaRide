
import { CarFront } from 'lucide-react';
import type React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 text-primary ${className}`}>
      <CarFront size={32} strokeWidth={2.5} />
      <h1 className="text-xl font-headline font-bold">ArewaRide & Logistics</h1>
    </div>
  );
};

export default Logo;
