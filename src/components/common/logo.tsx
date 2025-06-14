
import Link from 'next/link';
import { Package2 } from 'lucide-react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-bold font-headline text-primary ${className}`} aria-label="Indiazon Home">
      <Package2 className="h-7 w-7" />
      <span>Indiazon</span>
    </Link>
  );
};

export default Logo;
