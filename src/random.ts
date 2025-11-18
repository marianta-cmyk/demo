import { memoizeRange } from './utils.js';

const rng = Math.random;

export function range(n: number): number[] {
	const items: number[] = [];
	for (let i = 0; i < n; i ++) {
		items.push(i);
	}
	return items;
}

export function random(params: { minimum: number; maximum: number }) {
	return rng() * (params.maximum - params.minimum) + params.minimum;
}
export const uniqueRandom = memoizeRange(random);
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
