function randomChoiceWithReplacement(list: string[]): string[] {
	if (list.length === 0) {
		throw new Error('Η λίστα δεν πρέπει να είναι άδεια.');
	}

	function getRandomItem(): string {
		const index = Math.floor(Math.random() * list.length);
		const item = list[index];
		if (item === undefined) {
			throw new Error('Προβλημα με τον τυχαίο δείκτη');
		}
		return item;
	}

	const firstItem = getRandomItem();
	const secondItem = getRandomItem();

	return [firstItem, secondItem];
}

const fruits = ['μήλο', 'μπανάνα', 'πορτοκάλι', 'αχλάδι', 'κεράσι'];
console.log('Τυχαία επιλεγμένα στοιχεία:', randomChoiceWithReplacement(fruits));
