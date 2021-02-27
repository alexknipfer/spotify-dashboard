interface Props {
  count: number;
  label: string;
}

const Statistic: React.FC<Props> = ({ count, label }) => {
  return (
    <div className="text-center mr-5 last:mr-0">
      <div className="text-spotify-green text-xl mb-1">{count}</div>
      <div className="uppercase text-xs text-gray-400">{label}</div>
    </div>
  );
};

export default Statistic;
