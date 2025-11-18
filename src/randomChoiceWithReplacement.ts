function randomChoiceWithReplacement(list) {
	if (list.length === 0) {
		console.log('Η λίστα πρέπει να έχει περιεχόμενο.');
	}

	const getRandomElement = () => list[Math.floor(Math.random() * list.length)];

	const first = getRandomElement();
	const second = getRandomElement();

	return [first, second];
}

// Παράδειγμα
const myList = ['μήλο', 'μπανάνα', 'πορτοκάλι', 'αχλάδι', 'κεράσι'];
const result = randomChoiceWithReplacement(myList);

console.log('Τυχαία επιλογή:', result);

//2nd

// function randomChoiceWithReplacement(list: string[]): string[] {
//	if (list.length === 0) {
//		console.log('Η λίστα δεν πρέπει να είναι άδεια.');
//	}
//
//	function getRandomItem(): string {
//		const randomIndex = Math.floor(Math.random() * list.length);
//		return list[randomIndex]!;
//	}
//
//	const firstItem = getRandomItem();
//	const secondItem = getRandomItem();
//
//	return [firstItem, secondItem];
//}

//const fruits = ['μήλο', 'μπανάνα', 'πορτοκάλι', 'αχλάδι', 'κεράσι'];
//console.log('Τυχαία επιλoγή', randomChoiceWithReplacement(fruits));
