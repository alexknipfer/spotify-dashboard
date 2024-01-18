'use client';

import Link from 'next/link';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import SpotifyLogo from '../../public/static/icons/spotify_logo.svg';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';

import { DashboardRoutes, NavigationHeaderRoutes } from '@/config/route-config';

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
            href={DashboardRoutes.base.template}
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
          {NavigationHeaderRoutes.map(({ template, name }) => (
            <Link
              key={template}
              href={template}
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
