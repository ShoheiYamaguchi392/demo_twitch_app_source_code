import clsx from 'clsx';
import React, { forwardRef, ForwardedRef } from 'react';

import styles from './GameCard.module.scss';

import Card from '@/components/Atoms/Card';
import { useHideOnOffScreen } from '@/hooks/useHideOnOffScreen';
import { getTwitchPages } from '@/utils/getTwitchPages';

type propsType = {
	gameInfo: {
		id: string;
		name: string;
		imageUrl: string;
	};
	className?: string;
};

const GameCard = (props: propsType, ref: ForwardedRef<HTMLElement>) => {
	const { gameInfo, className } = props;

	const gameUrl = getTwitchPages({
		gameName: gameInfo.name,
	}).game;

	const { offScreenRef, height, isElementOffScreen, resetHeight } =
		useHideOnOffScreen();

	return (
		<Card className={clsx(styles.card, className)} ref={ref}>
			<div
				ref={offScreenRef as React.RefObject<HTMLDivElement>}
				style={{ minHeight: isElementOffScreen ? height : 0 }}
				className={styles['card-inner-wrapper']}
			>
				<a
					href={gameUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={styles['game-image-wrapper']}
				>
					<img
						src={gameInfo.imageUrl}
						alt={gameInfo.name}
						className={styles['game-image']}
					/>
				</a>
				<div className={styles['game-info-wrapper']}>
					<a
						href={gameUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={styles['game-name']}
					>
						{gameInfo.name}
					</a>
				</div>
			</div>
		</Card>
	);
};

export default forwardRef(GameCard);
