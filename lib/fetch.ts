import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

interface FetchConfig {
  nextConfig?: NextFetchRequestConfig;
  cache?: RequestCache;
}

export class Fetch {
  constructor(private config: FetchConfig = {}) {
    this.config = {
      nextConfig: config.nextConfig,
      cache: config.cache || 'no-store',
    };
  }

  public async get<Result>(
    url: string,
    nextFetchConfig?: NextFetchRequestConfig,
  ): Promise<Result> {
    const headers = await this.getHeaders();
    const response = await fetch(url, {
      headers,
      next: nextFetchConfig,
      cache: 'no-store',
    });

    return this.handleResponse(response);
  }

  public async post<Result>(
    url: string,
    headers: Headers,
    body: BodyInit,
  ): Promise<Result> {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    return this.handleResponse(response);
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`HTTP Response: ${response.statusText}`);
    }

    const json = await response.json();

    if (json.error) {
      throw new Error(json.error.message);
    }

    return json;
  }

  private async getHeaders() {
    const session = await getServerSession(authOptions);

    return new Headers({
      Authorization: `Bearer ${session?.accessToken}`,
    });
  }
}
