//Devuelve un numero aleatorio en funcion de unos parametros
function getRandomNumber(min, max) {
	return new Promise((resolve, reject) => {
		let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		resolve(randomNumber);
	});
}

//Devuelve un numero aleatorio unico entre 1 a 999
async function getUniqueRandomNumbers() {
	let randomNumbers = [];
	while (randomNumbers.length < 100) {
		let randomNumber = await getRandomNumber(1, 1000);
		if (!randomNumbers.includes(randomNumber)) {
			randomNumbers.push(randomNumber);
		}
	}
	return randomNumbers;
}

//Selecciona un numero aleatorio unico entre dos 0 a 29, que son la cantidad de idiomas disponibles actualmente
function selectRandomLanguage(indexLanguage) {
	let min = 1;
	let max = 27;

	let medio = (max + min) / 2;

	// Generamos un número aleatorio entre 0 y 1
	let random = Math.random();

	// Declaramos una variable para guardar el resultado
	let number;

	// Comprobamos la probabilidad
	if (random <= 0.4) {
		// Elegimos un número inferior a la mitad del máximo
		number = Math.floor(Math.random() * (medio - min) + min);
	} else {
		// Elegimos un número superior o igual a la mitad del máximo
		number = Math.floor(Math.random() * (max - medio) + medio);
	}
	while (number == indexLanguage) {
		if (random <= 0.4) {
			// Elegimos un número inferior a la mitad del máximo
			number = Math.floor(Math.random() * (medio - min) + min);
		} else {
			// Elegimos un número superior o igual a la mitad del máximo
			number = Math.floor(Math.random() * (max - medio) + medio);
		}
	}
	return number;
}

function selectRandomLanguageProgresive(indexLanguage) {
	let availableNumber = selectLanguageProgressiveDifficulty(
		indexLanguage,
		round
	);
	let randomIndex = Math.floor(Math.random() * availableNumber.length);
	let randomLanguage = availableNumber[randomIndex] + 1;

	return randomLanguage;
}

//Selecciona un numero aleatorio unico entre 0 a 99, cantidad de rondas maximas que puede haber una partida
function selectRandomNumberWord(actualNumber) {
	let number = Math.floor(Math.random() * 100);
	while (number == actualNumber) {
		number = Math.floor(Math.random() * 100);
	}
	return number;
}

//Selecciona un numero que servira para acceder de manera aleatoria al array con las palabras unicas para cada partida.
function selectUniqueRandomNumberWord() {
	let number = Math.floor(Math.random() * 100);

	while (utilizedNumbers.includes(number)) {
		number = Math.floor(Math.random() * 100);
	}
	utilizedNumbers.push(number);
	return number;
}

function selectLanguageProgressiveDifficulty(selectedLanguage, round) {
	let availableLanguages = [];

	let languagesTypeA = [0, 1, 2, 4, 5, 8, 17, 26];
	let languagesTypeB = [3, 7, 10, 12, 14, 15, 16, 18, 19, 20, 22, 23, 24, 25];
	let languagesTypeC = [6, 11];
	let languagesTypeD = [21];
	let languagesTypeE = [9, 13, 16, 23, 26];

	selectedLanguage = parseInt(selectedLanguage);
	if (round >= 0 && round < 5) {
		if (languagesTypeA.includes(selectedLanguage)) {
			availableLanguages.push(...languagesTypeA);
		}
		if (languagesTypeB.includes(selectedLanguage)) {
			availableLanguages.push(...languagesTypeB);
			availableLanguages.push(0);
		}
		if (languagesTypeC.includes(selectedLanguage)) {
			availableLanguages.push(...languagesTypeC);
			availableLanguages.push(0);
		}
		if (languagesTypeD.includes(selectedLanguage)) {
			availableLanguages.push(...languagesTypeD);
			availableLanguages.push(...languagesTypeA);
		}
		if (languagesTypeE.includes(selectedLanguage)) {
			availableLanguages.push(...languagesTypeE);
			availableLanguages.push(0);
		}

		let indexByLanguage = availableLanguages.indexOf(selectedLanguage);
		if (indexByLanguage > -1) {
			availableLanguages.splice(indexByLanguage, 1);
		}
	}
	if (round >= 5 && round < 10) {
		if (languagesTypeA.includes(selectedLanguage)) {
			let aux = [3, 19, 20, 7, 9];
			availableLanguages.push(...aux);
		}
		if (languagesTypeB.includes(selectedLanguage)) {
			let aux = [1, 4, 5, 8];
			availableLanguages.push(...aux);
		}
		if (languagesTypeC.includes(selectedLanguage)) {
			let aux = [1, 2, 4, 5, 8, 18, 27];
			availableLanguages.push(...aux);
		}
		if (languagesTypeD.includes(selectedLanguage)) {
			let aux = [1, 4, 5, 8, 18, 27];
			availableLanguages.push(...aux);
		}
		if (languagesTypeE.includes(selectedLanguage)) {
			let aux = [1, 4, 5, 8, 18, 27];
			availableLanguages.push(...aux);
		}
	}
	if (round >= 10 && round < 15) {
		if (languagesTypeA.includes(selectedLanguage)) {
			let aux = [11, 23, 13, 24, 25, 15];
			availableLanguages.push(...aux);
		}
		if (languagesTypeB.includes(selectedLanguage)) {
			let aux = [2, 7, 9, 11, 18, 21, 23];
			availableLanguages.push(...aux);
		}
		if (languagesTypeC.includes(selectedLanguage)) {
			let aux = [3, 7, 11, 13, 15, 16, 19, 20, 21, 23, 24, 25];
			availableLanguages.push(...aux);
		}
		if (languagesTypeD.includes(selectedLanguage)) {
			let aux = [2, 3, 7, 11, 13, 15, 16, 19, 20, 21, 23, 24, 25];
			availableLanguages.push(...aux);
		}
		if (languagesTypeE.includes(selectedLanguage)) {
			let aux = [2, 3, 7, 11, 13, 15, 16, 19, 20, 21, 23, 24, 25];
			availableLanguages.push(...aux);
		}
	}
	if (round >= 15 && round < 20) {
		if (languagesTypeA.includes(selectedLanguage)) {
			let aux = [6, 12, 16, 21, 26];
			availableLanguages.push(...aux);
		}
		if (languagesTypeB.includes(selectedLanguage)) {
			let aux = [13, 19, 20];
			availableLanguages.push(...aux);
		}
		if (languagesTypeC.includes(selectedLanguage)) {
			let aux = [9, 14, 17, 23, 26];
			availableLanguages.push(...aux);
		}
		if (languagesTypeD.includes(selectedLanguage)) {
			let aux = [6, 12];
			availableLanguages.push(...aux);
		}
		if (languagesTypeE.includes(selectedLanguage)) {
			let aux = [10, 22, 28];
			availableLanguages.push(...aux);
		}
	}
	if (round >= 20 && round < 25) {
		if (languagesTypeA.includes(selectedLanguage)) {
			let aux = [10, 14, 17, 28];
			availableLanguages.push(...aux);
		}
		if (languagesTypeB.includes(selectedLanguage)) {
			let aux = [6, 10, 12, 17, 22, 27, 28];
			availableLanguages.push(...aux);
		}
		if (languagesTypeC.includes(selectedLanguage)) {
			let aux = [10, 22, 28];
			availableLanguages.push(...aux);
		}
		if (languagesTypeD.includes(selectedLanguage)) {
			let aux = [9, 14, 17, 23, 26];
			availableLanguages.push(...aux);
		}
		if (languagesTypeE.includes(selectedLanguage)) {
			let aux = [6, 12];
			availableLanguages.push(...aux);
		}
	}

	return availableLanguages;
}
