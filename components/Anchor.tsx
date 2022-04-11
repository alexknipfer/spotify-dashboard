import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props {
  href: string;
  isExternal?: boolean;
  className?: string;
}

const Anchor: React.FC<PropsWithChildren<Props>> = ({
  isExternal,
  href,
  children,
  className,
}) => {
  const classes = `text-white text-base hover:underline ${className}`;

  if (isExternal) {
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {children}
    </a>;
  }

  return (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  );
};

export default Anchor;
