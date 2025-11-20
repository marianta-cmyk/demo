import { memoizeRange } from './utils.js';

const rng = Math.random;

export function range(n: number): number[] {
	const items: number[] = [];
	for (let i = 0; i < n; i++) {
		items.push(i);
	}
	return items;
}
export function random(params: {
	integer: boolean;
	minimum: number;
	maximum: number;
}) {
	const n = rng() * (params.maximum - params.minimum) + params.minimum;
	return params.integer ? Math.round(n) : n;
}
export const uniqueRandom = memoizeRange(random);
function octal() {
	return random({
		integer: true,
		minimum: 0,
		maximum: 255,
	});
}
export function rgb() {
	const [r, g, b] = [octal(), octal(), octal()];
	return `rgb(${r},${g},${b})`;
}
export const uniquergb = memoizeRange(rgb);
