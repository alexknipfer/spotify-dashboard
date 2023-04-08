import Link from 'next/link';

interface Props {
  children: string;
  href: string;
  isExternal?: boolean;
  className?: string;
}

const Anchor = ({ isExternal, href, children, className }: Props) => {
  const classes = `text-white text-base hover:underline ${className}`;

  if (isExternal) {
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {children}
    </a>;
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};

export default Anchor;
