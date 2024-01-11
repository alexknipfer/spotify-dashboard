import Heading from '@/components/heading';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Heading level="h1" className="mb-5">
        Recently Played
      </Heading>
      {children}
    </div>
  );
}
