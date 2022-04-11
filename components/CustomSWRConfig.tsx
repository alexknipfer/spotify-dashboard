import { SWRConfig, Cache } from 'swr';
import { Fetcher, PublicConfiguration } from 'swr/dist/types';

type Provider = { provider?: (cache: Readonly<Cache<any>>) => Cache<any> };

interface Props {
  children: React.ReactNode;
  swrConfig?: Partial<PublicConfiguration<any, any, Fetcher<any>>> & Provider;
}

const CustomSWRConfig = ({ children, swrConfig }: Props) => (
  <SWRConfig value={{ fetcher: customFetcher, ...swrConfig }}>
    {children}
  </SWRConfig>
);

const customFetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const json = (await res.json()) as { message: string };
    throw new Error(json.message);
  }

  return res.json();
};

export default CustomSWRConfig;
