import MainLayout from '@/components/Layout/MainLayout/MainLayout';
import GameCard from '@/components/Organisms/GameCard/GameCard';
import useTop from '@/pages/Top/useTop';

const Top = () => {
	const { gameList } = useTop();

	return (
		<MainLayout>
			{gameList.map((game) => (
				<GameCard gameInfo={game} key={game.id} />
			))}
		</MainLayout>
	);
};

export default Top;
