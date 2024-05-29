import { SERVER_URL } from '@config/site.config.ts';
import { dateToTime } from '@helpers/date.ts';
import { flatObj } from '@helpers/object.ts';
import {
  type ApiErrorResponse,
  type ApiResponseData,
  type FetchArgs,
  type FetchResponse,
  type UseFetchResponse,
} from '@interface/hooks/useFetch.interface.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook for performing fetch requests and handling the response.
 * This hook abstracts the fetch API and provides a simple interface to perform GET or other HTTP requests,
 * manage loading and error states, and automatically parse JSON responses.
 *
 * @template T The expected type of the response data.
 * @param {string} path The endpoint path to fetch data from.
 * @param {FetchArgs} [args] Optional arguments to customize the fetch request, including method, body, headers, and more.
 * @returns {UseFetchResponse<T>} An object containing the response data, loading state, error state, and a refetch function.
 */
function useFetch<T = any>(
  path: string,
  args?: FetchArgs,
): UseFetchResponse<T> {
  const { t } = useTranslation();
  const [response, setResponse] = useState<FetchResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const defaultErrorResponse: ApiErrorResponse = useMemo(
    () => ({
      code: '-1',
      message: t('response.error'),
      data: null,
      error: true,
      statusCode: 500,
      errors: [],
    }),
    [t],
  );

  const generateCacheKey = useCallback(() => {
    const queryParams = new URLSearchParams(args?.search || {}).toString();
    return `${args?.url || SERVER_URL}${path}?${queryParams}`;
  }, [args?.url, path, args?.search]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const method = args?.method || 'GET';
    const body = args?.body || null;
    const options = args?.options || null;
    const headers = args?.headers || null;
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
      const res = await fetch(generateCacheKey(), fetchOptions);
      const json = (await res.json()) as ApiResponseData | ApiErrorResponse;
      const isError = json.error;
      const responseData = {
        status: json.statusCode,
        data: json.data as T,
        flatData: flatObj(json?.data || {}),
        code: json.code,
        errors: 'errors' in json ? json.errors : [],
        message: isError
          ? t(`response.${json.code}`) || json.message
          : json.message,
        timestamp: Date.now(),
        rawData: json,
      };
      setResponse(responseData as FetchResponse<T>);
      setIsError(isError);
    } catch (error) {
      console.error('Fetch error:', error);
      setIsError(true);
      setResponse({
        status: 500,
        code: '-77',
        errors: [error],
        message: t('response.error'),
        rawData: defaultErrorResponse,
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    args?.method,
    args?.body,
    args?.options,
    args?.headers,
    defaultErrorResponse,
    generateCacheKey,
    t,
  ]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    fetchData().then(() => {
      if (args?.refetchInterval) {
        const interval = dateToTime(args?.refetchInterval);
        intervalId = interval ? setInterval(fetchData, interval * 1000) : null;
      }
    });
    return () => {
      if (args?.refetchInterval && intervalId) {
        clearInterval(intervalId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args?.refetchInterval]);

  return {
    data: response?.data,
    flatData: flatObj(response?.data || {}),
    code: response?.code || '-77',
    refetch: fetchData,
    isLoading,
    isError,
    isSuccess: !!response && response.status >= 200 && response.status < 300,
    timestamp: response?.timestamp,
    status: response?.status ?? 0,
    rawData: response?.rawData || defaultErrorResponse,
  };
}

export default useFetch;
