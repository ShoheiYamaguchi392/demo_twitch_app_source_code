import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

import { getPages } from '@/utils/getPages';

const Header = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles['inner-wrapper']}>
				<Link to={getPages().top} className={styles.title}>
					Twitch Demo App
				</Link>
				<a
					href="https://github.com/ShoheiYamaguchi392/demo_twitch_app"
					target="_blank"
					rel="noopener noreferrer"
					className={styles['github-link']}
				>
					source code on github
				</a>
			</div>
		</div>
	);
};

export default Header;
