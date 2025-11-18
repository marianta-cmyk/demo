const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const availableChars = chars.split('');

const randomArray: string[] = [];

// Θέλουμε string μήκους 6
const stringLength = 6;

// Επιλέγουμε 6 χαρακτήρες χωρίς να επαναληφθούν
for (let i = 0; i < stringLength; i++) {
	const randomIndex = Math.floor(Math.random() * availableChars.length);
	const randomChar = availableChars[randomIndex];

	// Προσθέτουμε τον χαρακτήρα στο αποτέλεσμα
	if (randomChar) {
		randomArray.push(randomChar);
		availableChars.splice(randomIndex, 1); // αφαιρούμε τον χαρακτήρα για να μην ξαναεμφανιστεί
	}
}

// Ενώνουμε τους χαρακτήρες σε string
const randomString = randomArray.join('');

// Εμφανίζουμε το αποτέλεσμα
console.log('Τυχαίο string 6 χαρακτήρων χωρίς replacement:', randomString);
