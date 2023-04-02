/**
 * Twitch内のページのURLを取得する
 */

type propsType = {
	gameName?: string;
	streamId?: string;
	userName?: string;
};

export const getTwitchPages = (props: propsType = {}) => {
	const top = 'https://www.twitch.tv';

	return {
		game: `${top}/directory/game/${props.gameName}`,
		streamOnLive: `${top}/${props.userName}`,
	};
};
