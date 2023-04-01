import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

import { getPages } from '@/utils/getPages';

const Header = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles['inner-wrapper']}>
				<Link to={getPages().top} style={{ color: 'white' }}>
					Twitch Demo App
				</Link>
			</div>
		</div>
	);
};

export default Header;
