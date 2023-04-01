import { useState, useEffect } from 'react';
import { useInRouterContext } from 'react-router-dom';

import { useApi } from '@/hooks/useApi';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import {
	TopGamesResType,
	TopGamesResDataType,
	TopGamesParamsType,
} from '@/utils/types/apiTypes';

type gameList = {
	id: string;
	name: string;
	imageUrl: string;
}[];

const MaxFetchLength = 10;

const useTop = () => {
	const [gameList, setGameList] = useState<gameList>([]);
	const [paginationCursor, setPaginationCursor] = useState<string | undefined>(
		undefined
	);

	const formatGameData = (gameDataList: TopGamesResDataType[]) => {
		return gameDataList.map(({ box_art_url, ...otherData }) => {
			return {
				...otherData,
				imageUrl: box_art_url.replace('-{width}x{height}', ''),
			};
		});
	};

	/**
	 * 初回取得
	 */
	const { api: initialFetchApi, isLoading: isFetchLoading } = useApi<
		TopGamesResType,
		TopGamesParamsType
	>({
		onSuccess: (data) => {
			setGameList(formatGameData(data.data));
			setPaginationCursor(data?.pagination?.cursor);
		},
	});
	const fetchGames = async () => {
		initialFetchApi.get('games/top', {
			first: MaxFetchLength,
		});
	};

	/**
	 * 追加取得
	 */
	const { api: nextFetchApi, isLoading: isNextFetchLoading } =
		useApi<TopGamesResType>({
			onSuccess: (data) => {
				setGameList((prevState) => [
					...prevState,
					...formatGameData(data.data),
				]);
				setPaginationCursor(data?.pagination?.cursor);
			},
		});
	const { isIntersecting, bottomElementRef } = useInfiniteScroll({
		rootMargin: '0px 0px 1000px 0px',
	});
	const fetchNextGames = async () => {
		if (
			!(gameList.length > 0) ||
			isFetchLoading ||
			isNextFetchLoading ||
			!paginationCursor
		) {
			return;
		}
		nextFetchApi.get('games/top', {
			first: MaxFetchLength,
			after: paginationCursor,
		});
	};

	useEffect(() => {
		fetchGames();
	}, []);

	useEffect(() => {
		if (!isIntersecting) return;

		fetchNextGames();
	}, [isIntersecting]);

	return {
		gameList,
		hasMore: !!paginationCursor,
		loading: {
			isFetchLoading,
			isNextFetchLoading,
		},
		fetchNextGames,
		bottomElementRef,
	};
};

export default useTop;
