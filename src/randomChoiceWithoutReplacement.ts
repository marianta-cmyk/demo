function randomChoiceWithoutReplacement(list: string[]): [string, string] {
	if (list.length < 2) {
		throw new Error('Η λίστα πρέπει να έχει τουλάχιστον 2 στοιχεία.');
	}

	const copy = [...list];

	const firstIndex = Math.floor(Math.random() * copy.length);
	const firstItem = copy.splice(firstIndex, 1)[0];

	if (firstItem === undefined) {
		throw new Error('Προβλημα με την επιλογή του πρώτου στοιχείου');
	}

	const secondIndex = Math.floor(Math.random() * copy.length);
	const secondItem = copy[secondIndex];

	if (secondItem === undefined) {
		throw new Error('Προβλημα με την επιλογή του δεύτερου στοιχείου');
	}

	return [firstItem, secondItem];
}

const fruits = ['μήλο', 'μπανάνα', 'πορτοκάλι', 'αχλάδι', 'κεράσι'];
const result = randomChoiceWithoutReplacement(fruits);

console.log('Τυχαία επιλεγμένα στοιχεία χωρίς replacement:', result
