import { Button as MuiButton, ButtonProps } from '@mui/material';
import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './Button.module.scss';

const Button = (props: ButtonProps, ref: any) => {
	const { children, className, ...otherProps } = props;
	return (
		<MuiButton
			className={clsx(styles['button'], className)}
			ref={ref}
			{...otherProps}
		>
			{children}
		</MuiButton>
	);
};

export default forwardRef(Button);
