import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export class Fetch {
  public async get<Result>(url: string, revalidate = 60): Promise<Result> {
    const headers = await this.getHeaders();
    const response = await fetch(url, {
      headers,
      next: { revalidate },
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
      Authorization: `Bearer ${session.accessToken}`,
    });
  }
}
