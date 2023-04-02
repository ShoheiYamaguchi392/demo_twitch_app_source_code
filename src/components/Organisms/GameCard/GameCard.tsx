import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef, ForwardedRef, useEffect } from 'react';
import { useState } from 'react';

import styles from './GameCard.module.scss';
import { useGameCard } from './useGameCard';

import Card from '@/components/Atoms/Card';
import CircularProgress from '@/components/Atoms/CircularProgress/CircularProgress';
import StreamListItem from '@/components/Molecules/StreamListItem/StreamListItem';
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
	const { fetchStreams, streamList, loading, isStreamFetched } = useGameCard({
		gameId: gameInfo.id,
	});
	const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

	const gameUrl = getTwitchPages({
		gameName: gameInfo.name,
	}).game;

	const { offScreenRef, height, isElementOffScreen, resetHeight } =
		useHideOnOffScreen();

	const handleChangeStreamListAccordion = async () => {
		if (!isStreamFetched) {
			await fetchStreams();
		}
		setIsAccordionExpanded((prevState) => !prevState);
	};

	useEffect(() => {
		resetHeight();
	}, [isAccordionExpanded]);

	return (
		<Card className={clsx(styles.card, className)} ref={ref}>
			<div
				ref={offScreenRef as React.RefObject<HTMLDivElement>}
				style={{ minHeight: isElementOffScreen ? height : 0 }}
				className={styles['card-inner-wrapper']}
			>
				{isElementOffScreen ? null : (
					<>
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
							<Accordion
								className={styles.accordion}
								expanded={isAccordionExpanded}
								onChange={handleChangeStreamListAccordion}
								disableGutters
							>
								<AccordionSummary
									className={styles['accordion-summary']}
									expandIcon={
										loading.isFetchLoading ? (
											<CircularProgress size={10} />
										) : (
											<ExpandMoreIcon className={styles['expand-more-icon']} />
										)
									}
								>
									Streams
								</AccordionSummary>
								<AccordionDetails>
									{streamList.length > 0 && (
										<ol>
											{streamList.map((stream) => (
												<StreamListItem key={stream.id} streamInfo={stream} />
											))}
										</ol>
									)}
								</AccordionDetails>
							</Accordion>
						</div>
					</>
				)}
			</div>
		</Card>
	);
};

export default forwardRef(GameCard);
