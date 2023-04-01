import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './GameCard.module.scss';

import Card from '@/components/Atoms/Card';

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
		return (
			<Card className={clsx(className)} ref={ref}>
				{gameInfo.name}
			</Card>
		);
	}
);

export default GameCard;
