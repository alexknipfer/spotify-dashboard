'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { navItems } from '@/lib/constants';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block space-x-4">
      {Object.entries(navItems).map(([path, { name }]) => (
        <Link
          key={path}
          href={path}
          className={cn('text-zinc-50 font-medium text-sm', {
            'text-zinc-400': pathname !== path,
          })}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
