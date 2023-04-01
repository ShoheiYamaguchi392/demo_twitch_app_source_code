import { Card as MuiCard, CardProps } from '@mui/material';
import { forwardRef } from 'react';

const Card = forwardRef<HTMLDivElement, CardProps>(
	({ children, ...otherProps }, ref) => {
		return (
			<MuiCard ref={ref} {...otherProps}>
				{children}
			</MuiCard>
		);
	}
);

export default Card;
