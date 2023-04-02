import { Card as MuiCard, CardProps } from '@mui/material';
import { forwardRef } from 'react';

const Card = (props: CardProps, ref: any) => {
	const { children, ...otherProps } = props;
	return (
		<MuiCard ref={ref} {...otherProps}>
			{children}
		</MuiCard>
	);
};

export default forwardRef(Card);
