import { cn } from '@/lib/utils';

interface Props {
  children: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

const Heading = ({ level, children, className }: Props) => {
  const Tag = level;

  return (
    <Tag
      className={cn(`font-bold text-white ${className}`, {
        'text-3xl md:text-4xl': level === 'h1',
        'text-2xl md:text-3xl': level === 'h2',
        'text-lg md:text-xl': level === 'h3',
        'text-md md:text-lg': level === 'h4',
      })}
    >
      {children}
    </Tag>
  );
};

export default Heading;
