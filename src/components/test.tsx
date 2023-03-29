import styles from './test.module.scss';

type TestPropsType = {
	text: string;
};

const Test: React.FC<TestPropsType> = ({ text }) => {
	const handleClickFetch = async () => {
		const res = await fetch(
			'https://api.twitch.tv/helix/games?name=elden ring',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Client-ID': String(import.meta.env.VITE_TWITCH_CLIENT_ID),
					Authorization: `Bearer ${import.meta.env.VITE_TWITCH_TOKEN}`,
				},
			}
		);
	};

	return (
		<>
			<button onClick={handleClickFetch}>Fetch</button>
			<p className={styles.test__text}>{text}</p>
		</>
	);
};

export default Test;
