//Se crea un array con los IDs de las palabras de cada ronda
function getArrayOfWords(indexWord) {
	let optionsWords = [];
	for (let i = 0; i < 2; i++) {
		optionsWords.push(selectRandomNumberWord(indexWord));
	}
	optionsWords.push(indexWord);
	return optionsWords;
}

function getArrayOfLangugagesProgresive(selectedLanguage) {
	//Se crea un array con los idiomas que saldara cada palabra
	let optionsLanguage = [];
	cookieJSON = cookieToJSON();
	for (let i = 0; i < 3; i++) {
		if (cookieJSON["difficulty"] == "progressive") {
			let aux = selectRandomLanguageProgresive(selectedLanguage);
			while (aux == parseInt(selectedLanguage) + 1) {
				aux = selectRandomLanguageProgresive(selectedLanguage);
			}
			optionsLanguage.push(aux);
		} else {
			let aux = selectRandomLanguage(selectedLanguage);
			while (aux == parseInt(selectedLanguage) + 1) {
				aux = selectRandomLanguage(selectedLanguage);
			}
			optionsLanguage.push(aux);
		}
	}
	return optionsLanguage;
}

function getCorrectAnswer(
	words,
	meaningWord,
	arrayOfOptions,
	arrayOfLanguages,
	selectedLanguage
) {
	for (let i = 0; i < 3; i++) {
		const option = arrayOfOptions[i];
		if (!option || !words[option]) {
		  console.warn(`Option '${option}' not found in 'words' object`);
		  continue;
		}
	  
		const correctAnswer = words[option][parseInt(selectedLanguage) + 1];
		if (correctAnswer !== undefined && meaningWord !== undefined &&
			correctAnswer.toString().toLowerCase() === meaningWord.toString().toLowerCase()) {
		  return words[option][arrayOfLanguages[i]].toString().toLowerCase();
		}
	  }
	  
	  throw new Error("Not correct option available");
}

function idToLanguage(id) {
	switch (id.toString()) {
		case "0":
			return "English";
		case "1":
			return "Spanish";
		case "2":
			return "Catalan";
		case "3":
			return "Romanian";
		case "4":
			return "French";
		case "5":
			return "Portuguese";
		case "6":
			return "Indonesian";
		case "7":
			return "German";
		case "8":
			return "Italian";
		case "9":
			return "Turkish";
		case "10":
			return "Polish";
		case "11":
			return "Vietnamese";
		case "12":
			return "Danish";
		case "13":
			return "Greek";
		case "14":
			return "Russian";
		case "15":
			return "Ukranian";
		case "16":
			return "Korean";
		case "17":
			return "Galician";
		case "18":
			return "Swedish";
		case "19":
			return "Finnish";
		case "20":
			return "Slovak";
		case "21":
			return "Swahili";
		case "22":
			return "Bulgarian";
		case "23":
			return "Latvian";
		case "24":
			return "Estonian";
		case "25":
			return "Albanian";
		case "26":
			return "Basque";
	}
}
