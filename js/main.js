function reloadCss() {
	document
		.querySelectorAll("link")
		.forEach(
			(link) => (link.href = link.href.replace(/\?.*|$/, "?" + Date.now()))
		);
}

/*
Hace una peticion al controllador donde le duevuelve un JSON con todas las palabras y sus IDs
*/
async function getWords(arrayOfId) {
	const allWords = await fetch("data/words.json")
	.then(response => response.json());
	

	let words = []
	for(let i in arrayOfId)
	{
		words.push(allWords[i])
	}

	return words;
}

//Indica el tiempo que le queda al usuario por cada ronda
let time = 7;
function renderOptions(meaningWord) {
	//Modifica el DOM y muestra al usuario la palabra
	const question = document.createElement("h4");
	question.classList.add("unselectable", "question");
	question.textContent = "Meaning of ";
	question.innerHTML += "<b class='word'>" + meaningWord.toLowerCase() + "</b>";

	game.appendChild(question);
}

//Crea un array con numeros aleatorios unicos del 0 al 2, existiendo todo el rango
function getOrderArray() {
	let orderWords = [0, 1, 2];
	let i = Math.floor(Math.random() * 3);
	[orderWords[i], orderWords[2]] = [orderWords[2], orderWords[i]];
	let j = Math.floor(Math.random() * 2);
	[orderWords[j], orderWords[1]] = [orderWords[1], orderWords[j]];
	return orderWords;
}

let meaningWord;
let incrementedPlayedGames = false;
function mainGame(words, selectedLanguage) {
	if (!incrementedPlayedGames) {
		cookieJSON = cookieToJSON();
		let auxPlayedGamesCookie = parseInt(cookieJSON["played_games"]) + 1;
		document.cookie = "played_games=" + auxPlayedGamesCookie.toString();
		cookieJSON = cookieToJSON();
	}
	incrementedPlayedGames = true;
	//Obtiene la palabra de la ronda actual
	let indexWord = selectUniqueRandomNumberWord();

	//Contiene las palabras con las opciones
	let optionsWords = getArrayOfWords(indexWord);

	//Contiene los idiomas de las opciones
	let optionsLanguage = getArrayOfLangugagesProgresive(selectedLanguage);
	for(let i = 0; i < optionsLanguage.length ; i++)
		optionsLanguage[i] = idToLanguage(optionsLanguage[i]);

	//Indicia el orden en que se accede al array
	let orderWords = getOrderArray();

	if (remove != true) {
		removeOptionsGame();
		removeSelectLangugage();
	}

	boolMenuLanguage = false;
	boolGame = true;
	boolRetry = false;
	renderRoundNumber();
	const game = renderGame();
	function renderCompleteRound() {
		renderTimer(game);
		meaningWord = words[indexWord][idToLanguage(selectedLanguage)];
		while (meaningWord == null) {
			utilizedNumbers.push(indexWord);
			indexWord = selectUniqueRandomNumberWord();
		}
		renderOptions(meaningWord);

		for (let i = 0; i < 3; i++) {
			renderWords(game, words, optionsWords, optionsLanguage, orderWords, i);
		}
	}
	renderCompleteRound();

	main.appendChild(game);

	window.onclick = function (e) {
		let idSelectedOption = e.target.id;
		idSelectedOption = sanitize(idSelectedOption);
		//En caso que el usuario no clicke en el nombre convierte su accion para que guarde la opcion que ha marcado.
		let selectedClass = e.srcElement;

		//Si el usuario hace click en el logo vuelve al inicio
		if (!endGame && selectedClass.classList.contains("title")) {
			boolGame = false;
			boolMenuLanguage = true;
			boolRetry = false;
			round = 0;
			time = 0;
			remove = false;
			endGame = false;
			utilizedNumbers = [];

			updateRoundCount(round);
			removePreviousRound();
			removeRoundCounter();
			renderSelectLanguage();
			renderOptionsGame();
			removeTimer();
			startAll();
		} else {
			if (!endGame && selectedClass.className == "languageOption") {
				selectedClass = e.target.parentElement;
				selectedClass = selectedClass.children[0];
			} else {
				if ((selectedClass.id >= 0) & (selectedClass.id <= 29)) {
					selectedClass = selectedClass.children[0];
				}
			}

			//Ha partir de la opcion que ha seleccionado el usuario comprueba si juega una ronda mas o ha perdido
			if (!endGame && selectedClass.className == "wordOption") {
				boolGame = true;
				let auxSelectedOption =
					words[indexWord][selectedClass.parentElement.id];
						
				//Comprueba si la palabra es valida
				if (
					auxSelectedOption.toString().toLowerCase() ==
					selectedClass.textContent.toString().toLowerCase()
				) {
					time = 7;
					selectedClass.parentElement.parentElement.style.pointerEvents =
						"none";
					renderAsCorrect(selectedClass);
					setTimeout(() => {
						selectedClass.parentElement.classList.remove("correct");
						updateRoundCount(round);
						removeRoundCounter();
						removePreviousRound();
						mainGame(words, selectedLanguage);
						selectedClass.parentElement.parentElement.style.pointerEvents =
							"all";
					}, 600);
					removeTimer(600);
					round++;
					cookieJSON = cookieToJSON();
					let auxRound = parseInt(cookieJSON["max_round"]);
					if (round > auxRound) {
						document.cookie = "max_round=" + round.toString();
						cookieJSON = cookieToJSON();
					}
				} else {
					boolGame = false;
					boolMenuLanguage = false;
					boolRetry = true;
					time = 7;
					selectedClass.parentElement.parentElement.style.pointerEvents =
						"none";
					renderAsIncorrect(selectedClass);
					setTimeout(() => {
						renderCorrectAnswer(
							getCorrectAnswer(
								words,
								meaningWord,
								optionsWords,
								optionsLanguage,
								selectedLanguage
							)
						);
					}, 25);
					setTimeout(() => {
						removeTimer();
						removeRoundCounter();
						removePreviousRound();
						renderRetryGame(main, round);
						selectedClass.parentElement.parentElement.style.pointerEvents =
							"all";
						endGame = true;
						round = 0;
					}, 850);
				}
			}

			if (endGame) {
				time = 7;

				let retryGameSelection = e.target.id;
				let auxRetryGameSelection = e.srcElement.classList;
				if (retryGameSelection == 1 && auxRetryGameSelection.contains("yes")) {
					boolGame = true;
					boolMenuLanguage = false;
					boolRetry = false;

					incrementedPlayedGames = false;

					round = 0;
					endGame = false;
					utilizedNumbers = [];
					updateRoundCount(round);

					removeRetryGame();
					getUniqueRandomNumbers().then((id) =>
						getWords(id).then((words) => {
							mainGame(words, selectedLanguage);
						})
					);
				}

				if (retryGameSelection == 0 && auxRetryGameSelection.contains("no")) {
					boolGame = false;
					boolMenuLanguage = true;
					boolRetry = false;

					round = 0;
					remove = false;
					endGame = false;
					utilizedNumbers = [];

					updateRoundCount(round);
					removeRetryGame();
					renderSelectLanguage();
					renderOptionsGame();
					startAll();
				}
			}
		}
	};
}

//Indica el numero de rondas jugadas
let round = 0;
//Remove permite saber si el cliente a seleccionado un lenguaje
let remove = false;
//Nos permite saber si se sigue creando rondas o se muestra el resultado final
let endGame = false;
//Contiene todos los id utilizados previamente en cada ronda
let utilizedNumbers = [];
//Permite seleccionar el lenguage que desea el usuario
let selectedLanguage;
//Guarda una copia del DOM para poder utilizarla mas adelante
let menuSelectLanguage;

let boolMenuLanguage = false;
let boolGame = false;
let boolRetry = false;

let gameOptionBoxSelected = false;

let cookieJSON = cookieToJSON();
// +1 año desde ahora
let date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
date = date.toUTCString();
if (
	!cookieJSON["dark_theme"] &&
	window.matchMedia("(prefers-color-scheme: dark)")
) {
	document.cookie = "dark_theme=on; expires=" + date;
}
if (!cookieJSON["difficulty"]) {
	document.cookie = "difficulty=random; expires=" + date;
}

if (!cookieJSON["max_round"]) {
	document.cookie = "max_round=0; expires=" + date;
}
if (!cookieJSON["played_games"]) {
	document.cookie = "played_games=0; expires=" + date;
}
if (!cookieJSON["number_correct_answer"]) {
	document.cookie = "number_correct_answer=0; expires=" + date;
}

cookieJSON = cookieToJSON();

let countPopstate = 0;

// Listen to the popstate event when the user goes back to the previous state
function popstateToMenu() {
	if (countPopstate == 0) {
		history.pushState({ title: "Vant" }, "", "");
		countPopstate++;
	}
	window.addEventListener("popstate", function (e) {
		// Get the saved state
		e.preventDefault();
		round = 0;
		time = 0;
		remove = false;
		endGame = false;
		utilizedNumbers = [];
		countPopstate = 0;
		if (boolGame) {
			updateRoundCount(round);
			removePreviousRound();
			removeRoundCounter();
			renderSelectLanguage();
			renderOptionsGame();
			removeTimer();
		}

		if (boolRetry) {
			updateRoundCount(round);
			removeRetryGame();
			renderSelectLanguage();
			renderOptionsGame();
		}

		boolMenuLanguage = true;
		boolGame = false;
		boolRetry = false;
		startAll();
	});
}

function startAll() {
	cookieJSON = cookieToJSON();
	window.onclick = function (e) {
		incrementedPlayedGames = false;

		menuSelectLanguage = document.getElementById("select");
		menuSelectLanguage = menuSelectLanguage.cloneNode(true);

		selectedLanguage = e.srcElement.className.toString();
		selectedLanguage = selectedLanguage.split(" ");
		selectedLanguage = selectedLanguage.slice(-1)[0];
		selectedLanguage = sanitize(selectedLanguage);
		boolMenuLanguage = true;

		if (
			selectedLanguage != "" &&
			selectedLanguage != "select" &&
			e.target.id == "language"
		) {
			popstateToMenu();
			getUniqueRandomNumbers().then((id) =>
				getWords(id).then((words) => {
					mainGame(words, selectedLanguage);
				})
			);
		} else {
			if (e.target.id == "optionBox" || e.target.id == "settings") {
				gameOptionBoxSelected = true;

				cookieJSON = cookieToJSON();
				renderSettings();
				document.getElementById("darkerBackground").style.overflowY = "hidden";
				document.getElementById("darkerBackground").style.pointerEvents =
					"none";
				setTimeout(() => {
					document.getElementById("darkerBackground").style.pointerEvents =
						"all";
				}, 410);
			} else {
				if (e.target.id == "statisticsBox" || e.target.id == "statistics") {
					gameOptionBoxSelected = true;

					renderStatistics();

					cookieJSON = cookieToJSON();
				} else {
					if (
						e.target.id == "darkerBackground" ||
						e.target.id == "closeBox" ||
						e.target.id == "closeIcon "
					) {
						gameOptionBoxSelected = false;
						removeSettings();
					}
				}
			}
		}
		if (e.target.id == "darkModeInput") {
			if (cookieJSON["dark_theme"] == "on") {
				document.cookie = "dark_theme=off";
				document.getElementById("darkerBackground").click();

				setTimeout(() => {
					location.reload();
				}, 500);
			} else {
				document.cookie = "dark_theme=on";
				document.getElementById("darkerBackground").click();
				setTimeout(() => {
					location.reload();
				}, 500);
			}
			if (document.getElementById("darkModeLabel").textContent == "Light")
				document.getElementById("darkModeLabel").textContent = "Dark";
			else {
				document.getElementById("darkModeLabel").textContent = "Light";
			}
		}

		if (e.target.id == "difficultyLabel") {
			if (cookieJSON["difficulty"] == "progressive") {
				document.cookie = "difficulty=random";
			} else {
				document.cookie = "difficulty=progressive";
			}
			if (
				document.getElementById("difficultyLabel").textContent == "Progressive"
			)
				document.getElementById("difficultyLabel").textContent = "Random";
			else {
				document.getElementById("difficultyLabel").textContent = "Progressive";
			}
		}
	};
}
startAll();

//Update cookie time
date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
date = date.toUTCString();
document.cookie = "expires=" + date;