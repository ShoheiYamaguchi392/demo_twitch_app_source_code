import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useState, useMemo } from 'react';

import { Status, DefaultMessage } from '@/utils/constants/api';

const axiosInstance = axios.create({
	baseURL: 'https://api.twitch.tv/helix/',
	timeout: 2000,
	headers: {
		'Content-Type': 'application/json',
		'Client-ID': String(import.meta.env.VITE_TWITCH_CLIENT_ID),
		Authorization: `Bearer ${import.meta.env.VITE_TWITCH_TOKEN}`,
	},
});

type useApiProps<T> = {
	onSuccess?: (data: T) => void;
	onError?: (error: unknown) => void;
	message: {
		success: string;
		error: string;
	};
};

export const useApi = <T = unknown, D = unknown>(
	props: Partial<useApiProps<T>> = {}
) => {
	const { onSuccess, onError, message } = props;
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<unknown | null>(null);
	const [status, setStatus] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const callApi = async (callFn: () => Promise<AxiosResponse<T>>) => {
		setIsLoading(true);

		try {
			const response = await callFn();

			setStatus(response.status);

			switch (response.status) {
				case Status.Unauthorized:
				case Status.Forbidden:
				case Status.NotFount:
				case Status.Timeout:
					setData(null);
					setError(new Error(DefaultMessage[response.status]));
					break;
				default:
					setData(response.data);
					setError(null);
					if (onSuccess) onSuccess(response.data);
			}
			return response;
		} catch (e) {
			setData(null);
			setStatus(null);
			setError(e);
			if (onError) await onError(e);
		} finally {
			setIsLoading(false);
		}
	};

	const api = useMemo(() => {
		return {
			get: (path: string, params: D, config: AxiosRequestConfig<D> = {}) =>
				callApi(
					async () => await axiosInstance.get(path, { params, ...config })
				),
			post: (path: string, data: D, config: AxiosRequestConfig<D> = {}) =>
				callApi(async () => await axiosInstance.get(path, { data, ...config })),
		};
	}, []);

	const reset = useCallback(() => {
		setData(null);
		setError(null);
		setStatus(null);
	}, []);

	return {
		api,
		data,
		status,
		error,
		isError: !!error,
		isLoading,
		reset,
	};
};
