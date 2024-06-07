import { SERVER_URL } from '@config/site.config.ts';
import { flatObj } from '@helpers/object.ts';
import {
  ApiErrorResponse,
  ApiResponseData,
  FetchArgs,
  type FetchResponse,
} from '@interface/hooks/useFetch.interface.ts';

class HttpClient<T = any> {
  private defaultErrorResponse: ApiErrorResponse = {
    code: '-1',
    message: 'An error occurred',
    data: null,
    error: true,
    statusCode: 500,
    errors: [],
  };
  private readonly baseUrl: string;

  /**
   * Constructs an instance of HttpClient.
   * @param path The base path for the API requests.
   * @param args Optional default arguments for fetch operations.
   */
  constructor(
    // eslint-disable-next-line no-unused-vars
    private path: string,
    // eslint-disable-next-line no-unused-vars
    private args?: FetchArgs,
    baseUrl?: string,
  ) {
    this.baseUrl = baseUrl || SERVER_URL();
  }

  /**
   * Performs a GET request.
   * @param queryParams Optional query parameters to append to the URL.
   * @param headers Optional headers to include in the request.
   * @returns A promise that resolves to the fetch response.
   */
  public async get(
    queryParams?: Record<string, string>,
    headers?: HeadersInit,
  ): Promise<FetchResponse<T>> {
    this.args = { ...this.args, method: 'GET', search: queryParams, headers };
    return await this.fetchData();
  }

  /**
   * Performs a POST request.
   * @param body The body of the request.
   * @param queryParams Optional query parameters to append to the URL.
   * @param headers Optional headers to include in the request.
   * @returns A promise that resolves to the fetch response.
   */
  public async post(
    body: Record<string, any>,
    queryParams?: Record<string, string>,
    headers?: HeadersInit,
  ): Promise<FetchResponse<T>> {
    this.args = {
      ...this.args,
      method: 'POST',
      body,
      search: queryParams,
      headers,
    };
    return await this.fetchData();
  }

  /**
   * Performs a PUT request.
   * @param body The body of the request.
   * @param queryParams Optional query parameters to append to the URL.
   * @param headers Optional headers to include in the request.
   * @returns A promise that resolves to the fetch response.
   */
  public async put(
    body: Record<string, any>,
    queryParams?: Record<string, string>,
    headers?: HeadersInit,
  ): Promise<FetchResponse<T>> {
    this.args = {
      ...this.args,
      method: 'PUT',
      body,
      search: queryParams,
      headers,
    };
    return await this.fetchData();
  }

  /**
   * Performs a PATCH request.
   * @param body The body of the request.
   * @param queryParams Optional query parameters to append to the URL.
   * @param headers Optional headers to include in the request.
   * @returns A promise that resolves to the fetch response.
   */
  public async patch(
    body: Record<string, any>,
    queryParams?: Record<string, string>,
    headers?: HeadersInit,
  ): Promise<FetchResponse<T>> {
    this.args = {
      ...this.args,
      method: 'PATCH',
      body,
      search: queryParams,
      headers,
    };
    return await this.fetchData();
  }

  /**
   * Performs a DELETE request.
   * @param queryParams Optional query parameters to append to the URL.
   * @param headers Optional headers to include in the request.
   * @returns A promise that resolves to the fetch response.
   */
  public async delete(
    queryParams?: Record<string, string>,
    headers?: HeadersInit,
  ): Promise<FetchResponse<T>> {
    this.args = {
      ...this.args,
      method: 'DELETE',
      search: queryParams,
      headers,
    };
    return await this.fetchData();
  }

  /**
   * Generates a cache key based on the current request parameters.
   * @returns A string representing the cache key.
   */
  private getUrl(): string {
    const queryParams = this.args?.search
      ? new URLSearchParams(
        this.args.search as Record<string, string>,
      ).toString()
      : '';
    return `${this.baseUrl}${this.path}?${queryParams}`;
  }

  /**
   * Fetches data from the server or cache based on the current request parameters.
   * @returns A promise that resolves to the fetch response.
   */
  private async fetchData(): Promise<FetchResponse<T>> {
    const method = this.args?.method || 'GET';
    const body = this.args?.body || null;
    const options = this.args?.options || null;
    const headers = this.args?.headers || null;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: method !== 'GET' ? JSON.stringify(body) : null,
      ...options,
    };

    try {
      const res = await fetch(this.getUrl(), fetchOptions);
      const json = (await res.json()) as ApiResponseData | ApiErrorResponse;
      const isError = json.error;
      return {
        status: json.statusCode,
        data: json.data as T,
        flatData: flatObj(json?.data || {}),
        code: json.code,
        errors: 'errors' in json ? json.errors : [],
        message: isError ? `Error: ${json.code}` : json.message,
        timestamp: Date.now(),
        rawData: json,
        isError,
      };
    } catch (error) {
      console.error('Fetch error:', error);
      return {
        status: 500,
        code: '-77',
        errors: [error],
        message: 'An error occurred',
        rawData: this.defaultErrorResponse,
        isError: false,
      };
    }
  }
}

export default HttpClient;
