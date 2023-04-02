import PersonIcon from '@mui/icons-material/Person';
import React from 'react';

import styles from './StreamListItem.module.scss';

import { getTwitchPages } from '@/utils/getTwitchPages';
import { GetStreamsResDataType } from '@/utils/types/apiTypes';

type PropsType = {
	streamInfo: GetStreamsResDataType;
};

const StreamListItem: React.FC<PropsType> = ({ streamInfo }) => {
	const {
		id,
		user_id,
		user_name,
		title,
		tags,
		viewer_count,
		language,
		thumbnail_url,
	} = streamInfo;

	const streamUrl = getTwitchPages({ userName: user_name }).streamOnLive;

	return (
		<li className={styles.wrapper}>
			<a
				href={streamUrl}
				target="_blank"
				rel="noopener noreferrer"
				className={styles['inner-wrapper']}
			>
				<img src={thumbnail_url} className={styles['thumbnail']} alt={title} />
				<div className={styles['stream-info-wrapper']}>
					<p className={styles['title']}>{title}</p>
					<div className={styles['stream-info-bottom-wrapper']}>
						<span className={styles['viewers']}>
							<PersonIcon className={styles['viewers-icon']} />
							{viewer_count.toLocaleString()}
						</span>
						<span>{user_name}</span>
					</div>
				</div>
			</a>
		</li>
	);
};

export default StreamListItem;
