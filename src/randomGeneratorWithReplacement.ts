import { randomIndices } from './random-choice.js';
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
	// const pool: string = '';
	// if (params.digits) {
	// 	// pool += characters.digits;
	// 	pool.concat(characters.digits);
	// }
	// if (params.lowercase) {
	// 	pool.concat(characters.lowercase);
	// }
	// if (params.uppercase) {
	// 	pool.concat(characters.uppercase);
	// }
	// if (params.symbols) {
	// 	pool.concat(characters.symbols);
	// }
	// let pool = '';
	// for (const key in characters) {
	// 	if (params[key]) {
	// 		pool += characters[key as keyof Characters];
	// 	}
	// }
	const pool = Object.keys(characters)
		.filter((item) => params[item as keyof Characters])
		.reduce((s, item) => s + characters[item as keyof Characters], '');
	const gen = randomIndices({
		replacement: params.replacement,
	});
	const items = [...pool];
	return (length: number): string => {
		const indices = gen(items, length);
		return items.filter((_, i) => indices.includes(i)).join('');
	};
}
const mypasswordgenerator = randomString({
	replacement: true,
	uppercase: true,
	lowercase: true,
	digits: false,
	symbols: false,
});

console.log(mypasswordgenerator(12));
