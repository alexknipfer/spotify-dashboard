import Image from 'next/image';

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
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block text-base text-white hover:underline mt-2"
      >
        {name}
      </a>
    </div>
  );
};

export default ArtistPreviewCard;
