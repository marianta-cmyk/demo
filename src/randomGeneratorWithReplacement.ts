import { random, range, uniqueRandom } from './random.js';
import { assert } from './utils.js';

const characters = {
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	digits: '01234567890',
	symbols: '!@#$%^*',
} as const;

type Characters = typeof characters;

type WithCharacters = {
	[K in keyof Characters]: boolean;
};

function stringIndices(params: { replacement: boolean }) {
	const generator = params.replacement ? random : uniqueRandom;

	return (items: string[], n: number): number[] => {
		assert(
			items.length > 0,
			'Πρέπει να επιλέξεις τουλάχιστον έναν τύπο χαρακτήρων.',
		);

		if (!params.replacement) {
			assert(
				n <= items.length,
				`Πρέπει να έχεις τουλάχιστον ${n} μοναδικούς χαρακτήρες.`,
			);
		}

		return range(n).map(() =>
			generator({
				minimum: 0,
				maximum: items.length,
			}),
		);
	};
}

function randomString(params: { replacement: boolean } & WithCharacters) {
	return (length: number): string => {
		//TODO;

		let pool = '';
		for (const key in characters) {
			if (params[key as keyof Characters]) {
				pool += characters[key as keyof Characters];
			}
		}

		// Μετατρέπουμε σε array
		const items = [...pool];

		// Παίρνουμε indices
		const indices = indicesGenerator(items, length);

		// Επιστρέφουμε χαρακτήρες
		return items.filter((_, i) => indices.includes(i)).join('');
	};
}
const makeString = randomString({
	replacement: true,
	uppercase: true,
	lowercase: true,
	digits: false,
	symbols: false,
});

console.log(makeString(12));
