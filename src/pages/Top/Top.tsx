import styles from './Top.module.scss';

import MainLayout from '@/components/Layout/MainLayout/MainLayout';
import GameCard from '@/components/Organisms/GameCard/GameCard';
import useTop from '@/pages/Top/useTop';

const Top = () => {
	const { gameList } = useTop();

	return (
		<MainLayout>
			{gameList.length > 0 && (
				<ol>
					{gameList.map((game) => (
						<li key={game.id} className={styles['card-wrapper']}>
							<GameCard gameInfo={game} />
						</li>
					))}
				</ol>
			)}
		</MainLayout>
	);
};

export default Top;
