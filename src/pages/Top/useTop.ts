import { useState, useEffect } from 'react';

import { useApi } from '@/hooks/useApi';
import { TopGamesResType, TopGamesResDataType } from '@/utils/types/apiTypes';

type gameList = {
	id: string;
	name: string;
	imageUrl: string;
}[];

const useTop = () => {
	const [gameList, setGameList] = useState<gameList>([]);
	const [paginationCursor, setPaginationCursor] = useState<string | null>(null);

	const formatGameData = (gameDataList: TopGamesResDataType[]) => {
		return gameDataList.map(({ box_art_url, ...otherData }) => {
			return {
				...otherData,
				imageUrl: box_art_url.replace('-{width}x{height}', ''),
			};
		});
	};

	const { api: initialFetchApi } = useApi<TopGamesResType>({
		onSuccess: (data) => {
			setGameList(formatGameData(data.data));
		},
	});

	const fetchGames = async () => {
		initialFetchApi.get('games/top');
	};

	useEffect(() => {
		fetchGames();
	}, []);

	return { gameList };
};

export default useTop;
