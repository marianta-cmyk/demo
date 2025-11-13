function generateRandomStringNoReplacement(
	length: number,
	chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string {
	const availableChars = chars.split('');

	if (length > availableChars.length) {
		throw new Error(
			'Το μήκος είναι μεγαλύτερο από τον αριθμό διαθέσιμων χαρακτήρων.',
		);
	}

	const resultArray: string[] = [];

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * availableChars.length);
		const char = availableChars[randomIndex];

		if (char === undefined) {
			throw new Error('Κάτι πήγε στραβά με τον τυχαίο δείκτη!');
		}

		resultArray.push(char);
		availableChars.splice(randomIndex, 1);
	}

	return resultArray.join('');
}

const randomString6 = generateRandomStringNoReplacement(6);
console.log('Τυχαίο string 6 χαρακτήρων χωρίς replacement:', randomString6);
