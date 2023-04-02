/**
 * Top Game
 * @see: https://dev.twitch.tv/docs/api/reference/#get-top-games
 */
export type TopGamesResDataType = {
	id: string;
	name: string;
	box_art_url: string;
	igdb_id: string;
};

export type TopGamesResType = {
	data: TopGamesResDataType[];
	pagination?:
		| {
				cursor: string;
		  }
		| undefined;
};

export type TopGamesParamsType = {
	first: number;
	after?: string;
};

/**
 * Get Streams
 * @see: https://dev.twitch.tv/docs/api/reference/#get-streams
 */
export type GetStreamsParamsType = {
	type: 'all' | 'live';
	game_id: string;
	first: number;
	after?: string;
};
export type GetStreamsResDataType = {
	id: string;
	user_id: string;
	user_name: string;
	title: string;
	tags: string[];
	viewer_count: number;
	language: string;
	thumbnail_url: string;
};
export type GetStreamsResType = {
	data: GetStreamsResDataType[];
	pagination?:
		| {
				cursor: string;
		  }
		| undefined;
};
