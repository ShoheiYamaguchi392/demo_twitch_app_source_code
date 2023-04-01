export type TopGamesResDataType = {
	id: string;
	name: string;
	box_art_url: string;
	igdb_id: string;
};

export type TopGamesResType = {
	data: TopGamesResDataType[];
	pagination:
		| {
				cursor: string;
		  }
		| undefined;
};

export type TopGamesParamsType = {
	first: number;
	after?: string;
};
