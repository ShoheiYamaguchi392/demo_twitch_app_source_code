import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './GameCard.module.scss';

import Card from '@/components/Atoms/Card';
import { getTwitchPages } from '@/utils/getTwitchPages';

type propsType = {
	gameInfo: {
		id: string;
		name: string;
		imageUrl: string;
	};
	className?: string;
};

const GameCard = forwardRef<HTMLDivElement, propsType>(
	({ gameInfo, className }, ref) => {
		const gameUrl = getTwitchPages({
			gameName: gameInfo.name,
		}).game;

		return (
			<Card className={clsx(styles.card, className)} ref={ref}>
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
				<div className={styles['inner-wrapper']}>
					<a
						href={gameUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={styles['game-name']}
					>
						{gameInfo.name}
					</a>
				</div>
			</Card>
		);
	}
);

export default GameCard;
