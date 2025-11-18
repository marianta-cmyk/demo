const inputs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomArray: string[] = [];

const stringLength = 6;

for (let i = 0; i < stringLength; i++) {
	const randomIndex = Math.floor(Math.random() * inputs.length);
	const randomInput = inputs[randomIndex];
	if (randomInput === undefined) {
		console.log('Κάτι πήγε στραβά!');
	}

	randomArray.push(randomInput);
}

const randomString = randomArray.join('');
console.log('Τυχαίο string 6 χαρακτήρων:', randomString);

//2nd
/* function generateRandomString(chars: string[], length: number): string {
  if (chars.length === 0) {
    console.log("Η λίστα χαρακτήρων δεν πρέπει να είναι άδεια.");
  }
  if (length <= 0) {
    console.log("Το μήκος πρέπει να είναι μεγαλύτερο από 0.");
  }

  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex]; // κάθε χαρακτήρας επιλέγεται με replacement
  }

  return result;
}

// Παράδειγμα
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
const randomString = generateRandomString(characters, 10);

console.log("Τυχαίο string:", randomString);
*/

/*
function generateRandomString6(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);

    result += chars[randomIndex];
  }

  return result;
}

// Παράδειγμα
const randomString = generateRandomString6();
console.log("Τυχαίο string 6 χαρακτήρων:", randomString);
*/
