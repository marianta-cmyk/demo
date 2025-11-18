function randomChoiceWithoutReplacement(list, n = 2) {
	if (list.length < n) {
		console.log('Η λίστα πρέπει να έχει τουλάχιστον n στοιχεία.');
	}

	const copy = [...list];
	const result = [];

	for (let i = 0; i < n; i++) {
		const index = Math.floor(Math.random() * copy.length);
		const [removedItem] = copy.splice(index, 1);
		result.push(removedItem);
	}

	return result;
}

// Παράδειγμα
const myList = ['μήλο', 'μπανάνα', 'πορτοκάλι', 'αχλάδι', 'κεράσι'];
console.log(randomChoiceWithoutReplacement(myList, 2));
