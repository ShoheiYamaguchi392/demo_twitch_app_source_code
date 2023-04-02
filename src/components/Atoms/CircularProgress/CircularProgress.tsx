import {
	CircularProgress as MuiCircularProgress,
	CircularProgressProps,
} from '@mui/material';
import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './CircularProgress.module.scss';

const CircularProgress = (props: CircularProgressProps, ref: any) => {
	const { className, ...otherProps } = props;
	return (
		<MuiCircularProgress
			ref={ref}
			className={clsx(styles['circular-progress'], className)}
			size={30}
			{...otherProps}
		/>
	);
};

export default forwardRef(CircularProgress);
