const inputs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomArray: string[] = [];

const stringLength = 6;

for (let i = 0; i < stringLength; i++) {
	const randomIndex = Math.floor(Math.random() * inputs.length);
	const randomInput = inputs[randomIndex];
	if (randomInput === undefined) {
		throw new Error('Κάτι πήγε στραβά με τον τυχαίο δείκτη!');
	}

	randomArray.push(randomInput);
}

const randomString = randomArray.join('');
console.log('Τυχαίο string 6 χαρακτήρων:', randomString);
