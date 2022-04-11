interface Props {
  label: string;
  value: string;
  isLoading: boolean;
}

const HeadlineStatistic = ({ label, value, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-400 h-5 md:h-6 mb-5 w-7/12 md:w-2/12" />
        <div className="bg-gray-400 h-16 md:h-32 w-9/12 md:w-4/12" />
      </div>
    );
  }

  return (
    <article className="text-gray-400">
      <h2 className="text-lg md:text-3xl uppercase">{label}</h2>
      <div className="text-7xl md:text-9xl">{value}</div>
    </article>
  );
};

export default HeadlineStatistic;
