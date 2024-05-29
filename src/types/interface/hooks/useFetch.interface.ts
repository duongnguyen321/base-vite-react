import mainLanguage from '@translation/vi.json';

export type CodeError = keyof typeof mainLanguage.errors.code;

export interface ApiResponseData {
  code: CodeError;
  message: string;
  data?: object | null;
  error: boolean;
  statusCode: number;
}

export interface ApiErrorDetail {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface ApiErrorResponse extends ApiResponseData {
  errors: ApiErrorDetail[];
}

type RESTMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchArgs {
  url?: string;
  search?: {
    [key: string]: string;
  };
  method?: RESTMethod;
  body?: Record<string, any>;
  options?: RequestInit;
  headers?: HeadersInit;
  cached?: boolean;
  cacheDuration?: string;
  refetchOnConnect?: boolean;
  refetchOnFocus?: boolean;
  refetchInterval?: string;
}

export interface FetchResponse<T> {
  status: number;
  code: CodeError;
  data?: T;
  flatData?: Record<string, any>;
  errors?: any[];
  message?: string;
  timestamp?: number;
  rawData: ApiResponseData | ApiErrorResponse;
}

export interface UseFetchResponse<T> extends FetchResponse<T> {
  isLoading: boolean;
  code: CodeError;
  isError: boolean;
  data: T | undefined;
  flatData: Record<string, any>;
  refetch: () => Promise<void>;
  rawData: ApiResponseData | ApiErrorResponse;
  isSuccess: boolean;
  timestamp: number | undefined;
  status: number;
}

export interface FetchCacheEntry<T> {
  timestamp: number;
  data: FetchResponse<T>;
}
