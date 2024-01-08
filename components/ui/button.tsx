'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { signOut } from 'next-auth/react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300',
  {
    variants: {
      variant: {
        default:
          'bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90',
        destructive:
          'bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90',
        outline:
          'border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 hover:text-zinc-50',
        secondary:
          'bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
        ghost: 'hover:text-zinc-900 dark:hover:text-zinc-50',
        link: 'underline-offset-4 hover:underline text-zinc-50',
        spotify:
          'bg-spotify-green hover:bg-spotify-light-green font-bold focus:outline-none focus:ring-2 focus:ring-spotify-light-green text-white rounded-full uppercase',
        logout: 'justify-start py-1.5',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        logout: 'px-0 py-0',
        spotify: 'py-3 px-6 text-xs font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  hrefExternal?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, hrefExternal, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    if (hrefExternal) {
      return (
        <a
          href={hrefExternal}
          className={cn(buttonVariants({ variant, size, className }))}
          target="_blank"
          rel="noreferrer"
        >
          {props.children}
        </a>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (variant === 'logout') {
            signOut();
          } else if (props.onClick) {
            props.onClick(event);
          }
        }}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
