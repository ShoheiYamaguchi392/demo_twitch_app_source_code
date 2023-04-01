import styles from './Top.module.scss';

import MainLayout from '@/components/Layout/MainLayout/MainLayout';
import GameCard from '@/components/Organisms/GameCard/GameCard';
import useTop from '@/pages/Top/useTop';

const Top = () => {
	const { gameList, hasMore, loading, fetchNextGames, bottomElementRef } =
		useTop();

	const isFetchNextButtonDisplayed =
		gameList.length > 0 &&
		hasMore &&
		!loading.isFetchLoading &&
		!loading.isNextFetchLoading;

	const isNoContentDisplayed = !loading.isFetchLoading && gameList.length === 0;

	return (
		<MainLayout>
			{!loading.isFetchLoading && gameList.length > 0 && (
				<ol>
					{gameList.map((game, index) => (
						<li key={game.id} className={styles['card-wrapper']}>
							<GameCard
								gameInfo={game}
								ref={
									index === gameList.length - 1 ? bottomElementRef : undefined
								}
							/>
						</li>
					))}
				</ol>
			)}
			{(loading.isFetchLoading || loading.isNextFetchLoading) && <p>loading</p>}
			{isFetchNextButtonDisplayed && (
				<button onClick={fetchNextGames}>load more</button>
			)}
			{isNoContentDisplayed && <p>loading</p>}
		</MainLayout>
	);
};

export default Top;
