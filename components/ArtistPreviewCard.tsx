import Image from 'next/image';
import Anchor from '@/components/Anchor';

interface Props {
  name?: string;
  imageSrc?: string;
  href?: string;
  isLoading?: boolean;
}

const ArtistPreviewCard: React.FC<Props> = ({
  name,
  imageSrc,
  href,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-full rounded-full bg-gray-600 circle" />
        <div className="h-4 w-8/12 bg-gray-600 mt-2" />
        <style jsx>{`
          .circle::before {
            content: '';
            display: block;
            padding-bottom: 100%;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Image src={imageSrc} width={208} height={208} className="rounded-full" />
      <Anchor isExternal href={href} className="block mt-2">
        {name}
      </Anchor>
    </div>
  );
};

export default ArtistPreviewCard;
