import Link from 'next/link';
interface Props {
  count: number;
  label: string;
  href?: string;
}
const Statistic: React.FC<Props> = ({ count, label, href }) => {
  const content = (
    <div className="text-center mr-5 last:mr-0">
      <div className="text-spotify-green text-xl mb-1">{count}</div>
      <div className="uppercase text-xs text-gray-400">{label}</div>
    </div>
  );
  if (href) {
    return (
      <Link href={href} passHref>
        <div className="cursor-pointer">{content}</div>
      </Link>
    );
  }

  return content;
};
export default Statistic;
