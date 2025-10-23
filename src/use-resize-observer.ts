function calculate(entry: ResizeObserverEntry): {
	dpr: number;
	width: number;
	height: number;
} {
	if (entry.devicePixelContentBoxSize[0]) {
		// NOTE: Only this path gives the correct answer
		// The other paths are imperfect fallbacks for browsers that don't provide anyway to do this
		return {
			dpr: 1, // it's already in width and height
			width: entry.devicePixelContentBoxSize[0].inlineSize,
			height: entry.devicePixelContentBoxSize[0].blockSize,
		};
	} else if (entry.contentBoxSize[0]) {
		return {
			dpr: window.devicePixelRatio,
			width: entry.contentBoxSize[0].inlineSize,
			height: entry.contentBoxSize[0].blockSize,
		};
	} else {
		return {
			dpr: window.devicePixelRatio,
			width: entry.contentRect.width,
			height: entry.contentRect.height,
		};
	}
}
export function useResizeObserver(
	fn: (
		size: {
			width: number;
			height: number;
		},
		target: Element,
	) => void,
) {
	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			let { dpr, width, height } = calculate(entry);
			fn(
				{
					width: Math.round(dpr * width),
					height: Math.round(dpr * height),
				},
				entry.target,
			);
		}
	});
	function observe(element: Element) {
		try {
			observer.observe(element, {
				box: 'device-pixel-content-box',
			});
			console.debug('Observing "device-pixel-content-box"');
		} catch (cause) {
			observer.observe(element, {
				box: 'content-box',
			});
			console.debug(
				'This browser does not support "device-pixel-content-box". Falling back to "content-box".',
				cause,
			);
		}
	}
	function unobserve(element: Element) {
		observer.unobserve(element);
	}
	function disconnect() {
		observer.disconnect();
	}
	return {
		observe,
		unobserve,
		disconnect,
	};
}
