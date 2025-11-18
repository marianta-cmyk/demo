import { random, range, uniqueRandom } from './random.js';
import { assert } from './utils.js';

// export function randomIndicesWithoutReplacement(items:string[], n: number): number[] {
// 	if (items.length === 0) {
// 		throw new Error(`Η λίστα πρέπει να exei στοιχεία.`);
// 	}
// 	if (n > items.length) {
// 		throw new Error(`Η λίστα πρέπει να έχει τουλάχιστον ${n} στοιχεία.`);
// 	}
// 	const generator = () => uniqueRandom({ minimum: 0, maximum: items.length});
// 	// mutable
// 	// const indices:number[] = [];
// 	// for (let i=0; i < n; i++) {
// 	// 	indices.push(generator());
// 	// }
// 	// return indices;
// 	return range(n).map(generator); // immutable
// }

// export function randomChoiceWithoutReplacement(items:string[], n = 2): string[] {
// 	const indices = randomIndicesWithoutReplacement(items, n);
// 	return items.filter((_, index) => indices.includes(index));
// }

// export function randomIndexWithReplacement(items: string[], n: number) {
// 	if (items.length === 0) {
// 		throw new Error(`Η λίστα πρέπει να exei στοιχεία.`);
// 	}
// 	if (n > items.length) {
// 		throw new Error(`Η λίστα πρέπει να έχει τουλάχιστον ${n} στοιχεία.`);
// 	}
// 	const generator = () => random({ minimum: 0, maximum: items.length});
// 	return range(n).map(generator);
// }
// export function randomChoiceWithReplacement(items: string[], n: number) {
// 	const indices = randomIndexWithReplacement(items, n);
// 	return items.filter((_, index) => indices.includes(index));
// }

export function randomIndices(params: { replacement: boolean }) {
	const generator = params.replacement ? random : uniqueRandom;
	return <Item>(items: Item[], n: number): number[] => {
		assert(items.length > 0, `Η λίστα πρέπει να exei στοιχεία.`);
		assert(
			n < items.length,
			`Η λίστα πρέπει να έχει τουλάχιστον ${n} στοιχεία.`,
		);
		return range(n).map(() =>
			generator({
				minimum: 0,
				maximum: items.length,
			}),
		);
	};
}
export function randomChoice(params: { replacement: boolean }) {
	const generator = randomIndices(params);
	// Typescript generics;
	return <Item>(items: Item[], n: number): Item[] => {
		const indices = generator(items, n);
		return items.filter((_, index) => indices.includes(index));
	};
}
