'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationHeaderRoutes } from '@/config/route-config';
import { cn } from '@/lib/utils';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block space-x-4">
      {NavigationHeaderRoutes.map(({ template, name }) => (
        <Link
          key={template}
          href={template}
          className={cn('text-zinc-50 font-medium text-sm', {
            'text-zinc-400': pathname !== template,
          })}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
