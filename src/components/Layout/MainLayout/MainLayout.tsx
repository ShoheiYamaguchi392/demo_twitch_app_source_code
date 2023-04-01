import React, { ReactNode } from 'react';

import styles from './MainLayout.module.scss';

import Header from '@/components/Molecules/Header';

type MainLayoutType = {
	children?: ReactNode;
};

const MainLayout: React.FC<MainLayoutType> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles['main-content-wrapper']}>children</div>
		</div>
	);
};

export default MainLayout;
