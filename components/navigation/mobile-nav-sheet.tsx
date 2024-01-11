'use client';

import Link from 'next/link';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import SpotifyLogo from '../../public/static/icons/spotify_logo.svg';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';

import { navItems } from '@/lib/constants';
import { RoutePath } from '@/types/route-path.enum';

export default function MobileNavSheet() {
  const [isOpen, setOpen] = useState(false);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <SheetTrigger asChild>
        <HamburgerMenuIcon className="md:hidden w-5 h-5" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <Link
            href={RoutePath.DASHBOARD}
            className="w-24 mr-6"
            aria-label="Return to dashboard"
            onClick={() => {
              setOpen(false);
            }}
          >
            <SpotifyLogo />
          </Link>
        </SheetHeader>
        <nav className="flex flex-col space-y-3 px-3 py-8">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="text-zinc-50"
              onClick={() => {
                setOpen(false);
              }}
            >
              {name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
