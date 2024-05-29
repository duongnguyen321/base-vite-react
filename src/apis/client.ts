import { SERVER_URL } from '@config/site.config.ts';
import { dateToTime } from '@helpers/date.ts';
import { flatObj } from '@helpers/object.ts';
import {
  ApiErrorResponse,
  ApiResponseData,
  FetchArgs,
  FetchCacheEntry,
  type FetchResponse,
} from '@interface/hooks/useFetch.interface.ts';

class HttpClient<T = any> {
  private fetchCache = new Map<string, FetchCacheEntry<T>>();
  private defaultErrorResponse: ApiErrorResponse = {
    code: '-1',
    message: 'An error occurred',
    data: null,
    error: true,
    statusCode: 500,
    errors: [],
  };

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
  ) {}

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
    return this.fetchData();
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
    return this.fetchData();
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
    return this.fetchData();
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
    return this.fetchData();
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
    return this.fetchData();
  }

  /**
   * Generates a cache key based on the current request parameters.
   * @returns A string representing the cache key.
   */
  private generateCacheKey(): string {
    const queryParams = this.args?.search
      ? new URLSearchParams(
          this.args.search as Record<string, string>,
        ).toString()
      : '';
    return `${this.args?.url || SERVER_URL}${this.path}?${queryParams}`;
  }

  /**
   * Fetches data from the server or cache based on the current request parameters.
   * @returns A promise that resolves to the fetch response.
   */
  private async fetchData(): Promise<FetchResponse<T>> {
    let cacheKey = '';
    if (
      this.args?.cached &&
      !this.args?.refetchInterval &&
      !this.args?.refetchOnFocus
    ) {
      cacheKey = this.generateCacheKey();
      const cached = this.fetchCache.get(cacheKey);
      const cacheDuration = dateToTime(this.args?.cacheDuration || '30s');
      if (cached && Date.now() - cached.timestamp < cacheDuration) {
        return cached.data;
      }
    }

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
      const res = await fetch(this.generateCacheKey(), fetchOptions);
      const json = (await res.json()) as ApiResponseData | ApiErrorResponse;
      const isError = json.error;
      const responseData: FetchResponse<T> = {
        status: json.statusCode,
        data: json.data as T,
        flatData: flatObj(json?.data || {}),
        code: json.code,
        errors: 'errors' in json ? json.errors : [],
        message: isError ? `Error: ${json.code}` : json.message,
        timestamp: Date.now(),
        rawData: json,
      };

      if (cacheKey && this.args?.cached) {
        this.fetchCache.set(cacheKey, {
          timestamp: Date.now(),
          data: { ...responseData },
        });
      }

      return responseData;
    } catch (error) {
      console.error('Fetch error:', error);
      return {
        status: 500,
        code: '-77',
        errors: [error],
        message: 'An error occurred',
        rawData: this.defaultErrorResponse,
      };
    }
  }
}

export default HttpClient;
