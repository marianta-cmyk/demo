import { memoizeRange } from './utils.js';

const rng = Math.random;

export function random(params: { minimum: number; maximum: number }) {
	return rng() * (params.maximum - params.minimum) + params.minimum;
}
function octal() {
	return random({
		minimum: 0,
		maximum: 255,
	});
}
export function rgb() {
	const [r, g, b] = [octal(), octal(), octal()];
	return `rgb(${r},${g},${b})`;
}
export const uniquergb = memoizeRange(rgb);
