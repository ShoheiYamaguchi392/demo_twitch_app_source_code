import styles from './Top.module.scss';

import Button from '@/components/Atoms/Button/Button';
import CircularProgress from '@/components/Atoms/CircularProgress/CircularProgress';
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
			{(loading.isFetchLoading || loading.isNextFetchLoading) && (
				<div className={styles['loading-wrapper']}>
					<CircularProgress />
				</div>
			)}
			{isFetchNextButtonDisplayed && (
				<Button onClick={fetchNextGames}>load more</Button>
			)}
			{isNoContentDisplayed && <p>no content</p>}
		</MainLayout>
	);
};

export default Top;
