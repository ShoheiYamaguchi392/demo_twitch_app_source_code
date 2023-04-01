import { useState, useCallback, useRef, RefObject } from 'react';

type optionsType = {
	rootMargin?: string;
};

/**
 * スクロールを監視する
 * @param {IntersectionObserverInit} options: IntersectionObserverのオプション
 */
export const useInfiniteScroll = (options: optionsType) => {
	const [isIntersecting, setIsIntersecting] = useState(false);

	const observer = useRef<IntersectionObserver | null>(null);
	const bottomElementRef = useCallback((node: HTMLElement) => {
		if (!(node instanceof Element)) return;

		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				setIsIntersecting(entry.isIntersecting);
			});
		}, options);

		observer.current.observe(node);
	}, []);

	return { bottomElementRef, isIntersecting };
};
