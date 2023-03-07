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

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`HTTP Response Code: ${response.status}`);
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
