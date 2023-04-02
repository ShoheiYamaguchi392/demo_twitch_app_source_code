import { useState, useEffect } from 'react';

import { useApi } from '@/hooks/useApi';
import {
	GetStreamsParamsType,
	GetStreamsResType,
	GetStreamsResDataType,
} from '@/utils/types/apiTypes';

type propsType = {
	gameId: string;
};

const MaxFetchLength = 10;

export const useGameCard = (props: propsType) => {
	const { gameId } = props;

	const [streamList, setStreamList] = useState<GetStreamsResDataType[]>([]);
	const [paginationCursor, setPaginationCursor] = useState<string | undefined>(
		undefined
	);

	const formatStreamData = (streamDataList: GetStreamsResDataType[]) => {
		return streamDataList.map(({ thumbnail_url, ...otherData }) => {
			return {
				...otherData,
				thumbnail_url: thumbnail_url.replace('-{width}x{height}', ''),
			};
		});
	};

	/**
	 * ストリーミング一覧取得
	 */
	const { api: initialFetchApi, isLoading: isFetchLoading } = useApi<
		GetStreamsResType,
		GetStreamsParamsType
	>({
		onSuccess: (data) => {
			setStreamList(formatStreamData(data.data));
			setPaginationCursor(data?.pagination?.cursor);
		},
	});
	const fetchStreams = async () => {
		initialFetchApi.get('streams', {
			type: 'live',
			game_id: gameId,
			first: MaxFetchLength,
		});
	};

	useEffect(() => {
		fetchStreams();
	}, []);

	return {
		streamList,
		loading: {
			isFetchLoading,
		},
	};
};
