'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface CustomProps {
  variant: 'primary' | 'outline' | 'unstyled';
  buttonSize?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  isLogout?: boolean;
  hrefExternal?: string;
  hrefInternal?: string;
}

type Props = CustomProps & React.HTMLProps<HTMLButtonElement>;

const Button = ({
  variant,
  type = 'button',
  children,
  hrefExternal,
  hrefInternal,
  buttonSize = 'medium',
  className,
  isLogout,
  ...props
}: Props) => {
  const classes = cn(
    `transition duration-200 text-white rounded-full uppercase tracking-widest ${className}`,
    {
      'py-3 px-6 text-xs font-bold':
        buttonSize === 'small' && variant !== 'unstyled',
      'py-4 px-10 text-base font-bold':
        buttonSize === 'medium' && variant !== 'unstyled',
      'bg-spotify-green hover:bg-spotify-light-green font-bold focus:outline-none focus:ring-2 focus:ring-spotify-light-green':
        variant === 'primary',
      'bg-transparent border border-white hover:bg-white hover:text-spotify-gray font-bold focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50':
        variant === 'outline',
      'p-1 font-normal bg-transparent normal-case text-base border-spotify-gray focus:outline-none':
        variant === 'unstyled',
    },
  );

  if (hrefExternal) {
    return (
      <a
        href={hrefExternal}
        className={classes}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  if (hrefInternal) {
    return (
      <Link href={hrefInternal} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      {...props}
      className={classes}
      onClick={(event) => {
        if (isLogout) {
          signOut();
        } else if (props.onClick) {
          props.onClick(event);
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
