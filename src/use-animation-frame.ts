export function useAnimationFrame(fn: (delta: number) => void) {
	let frame: number | null = null;
	let running = false;
	function loop(t: number, t0: number) {
		fn(Math.round(t - t0));
		frame = requestAnimationFrame((now) => {
			loop(now, t);
		});
	}
	function stop() {
		if (frame) {
			cancelAnimationFrame(frame);
			frame = null;
		}
		running = false;
	}
	function start() {
		stop();
		frame = requestAnimationFrame((now) => {
			loop(now, 0);
		});
		running = true;
	}
	return {
		stop,
		start,
		running,
	} as const;
}
