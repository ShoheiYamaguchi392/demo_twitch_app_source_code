import { useRef, useEffect, useState } from 'react';

/**
 * 画面外に消えた要素を、高さをそのままに削除するためのフック
 * 無限スクロールによってDOM描写が増えて動作が重くなることを防ぐ
 */
export const useHideOnOffScreen = () => {
	const offScreenRef = useRef<HTMLElement | null>(null);
	const windowWidthRef = useRef<number | null>(null);

	const [height, setHeight] = useState<number>(0);
	const [isElementOffScreen, setIsElementOffScreen] = useState<boolean>(false);

	const onWindowResize = () => {
		const windowWidth = window.innerWidth;

		if (
			windowWidthRef.current !== null &&
			windowWidth !== windowWidthRef.current
		) {
			setHeight(0);
		}

		windowWidthRef.current = windowWidth;
	};

	useEffect(() => {
		const checkPosition = () => {
			const isOffset = isOffScreen(offScreenRef);

			if (isOffset && offScreenRef.current instanceof HTMLElement) {
				setHeight(offScreenRef.current.offsetHeight);
			}
			setIsElementOffScreen(isOffset);
		};

		window.document.addEventListener('scroll', checkPosition);
		window.addEventListener('resize', onWindowResize);
		return () => {
			window.document.removeEventListener('scroll', checkPosition);
			window.removeEventListener('resize', onWindowResize);
		};
	}, []);

	return {
		offScreenRef,
		height,
		isElementOffScreen,
		resetHeight: () => {
			setHeight(0);
		},
	};
};

const OffScreenMargin = 500;

const isOffScreen = (ref: { current: HTMLElement | null }) => {
	if (!(ref.current instanceof HTMLElement)) return false;

	const rect = ref.current.getBoundingClientRect();
	return (
		rect.bottom < -OffScreenMargin ||
		rect.y > window.innerHeight + OffScreenMargin
	);
};
