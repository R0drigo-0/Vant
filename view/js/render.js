function reloadCss() {
	document
		.querySelectorAll("link[rel=stylesheet]")
		.forEach(
			(link) => (link.href = link.href.replace(/\?.*|$/, "?" + Date.now()))
		);
}

//Pregunta al usuario si quiere volver a jugar o quiere cambiar el idioma
function renderRetryGame(mainElement, rounds) {
	const endGameQuestion = document.createElement("div");
	endGameQuestion.classList.add("unselectable", "endGameQuestion");
	endGameQuestion.setAttribute("id", "endGameQuestion");

	function renderRetryGame(mainElement) {
		const retryGame = document.createElement("ul");
		retryGame.setAttribute("class", "retryGame");

		const retryGameQuestion = document.createElement("h3");
		retryGameQuestion.setAttribute("class", "retryGameQuestion");
		retryGameQuestion.textContent += "What do you want to do now?";

		const yes = document.createElement("li");
		yes.classList.add("unselectable", "yes");
		yes.setAttribute("id", 1);
		yes.textContent += "Start again";

		const no = document.createElement("li");
		no.classList.add("unselectable", "no");
		no.setAttribute("id", 0);
		no.textContent += "Change language";

		retryGame.appendChild(yes);
		retryGame.appendChild(no);
		mainElement.appendChild(retryGame);
	}

	//Muestra un mensaje al jugador con el resultado
	function renderNumberRounds(mainElement) {
		const endRounds = document.createElement("h2");
		endRounds.setAttribute("class", "endRounds");
		endRounds.innerHTML +=
			"Total rounds: <b class='numberEndRounds'> " + round + "</b>";
		mainElement.appendChild(endRounds);
	}

	mainElement.appendChild(endGameQuestion);
	renderNumberRounds(endGameQuestion, rounds);
	renderRetryGame(endGameQuestion);
}

function renderSelectLanguage() {
	main.appendChild(menuSelectLanguage);
}

function renderGame() {
	let main = document.getElementById("main");

	const game = document.createElement("div");
	game.classList.add("game");
	game.setAttribute("id", "game");

	main.appendChild(game);
	return game;
}

function renderRoundNumber() {
	const roundBox = document.getElementById("roundBox");
	if (roundBox.style.display == "none") {
		roundBox.style.display = "flex";
	}
}

//Permite modificar el DOM para introducir las opciones que podras seleccionar el usuario
function renderWords(
	game,
	words,
	optionsWords,
	optionsLanguage,
	orderWords,
	index
) {
	const option = document.createElement("div");

	option.classList.add("unselectable", "option");
	option.setAttribute("id", optionsLanguage[orderWords[index]] - 1);

	const optionWord = document.createElement("h4");
	optionWord.setAttribute(
		"id",
		words[optionsWords[orderWords[index]]][
			optionsLanguage[orderWords[index]]
		].toLowerCase()
	);
	optionWord.setAttribute("class", "wordOption");
	optionWord.textContent +=
		words[optionsWords[orderWords[index]]][
			optionsLanguage[orderWords[index]]
		].toLowerCase();

	const languageOption = document.createElement("h5");
	languageOption.setAttribute(
		"id",
		idToLanguage(optionsLanguage[orderWords[index]] - 1)
	);
	languageOption.setAttribute("class", "languageOption");
	languageOption.textContent +=
		"(" + idToLanguage(optionsLanguage[orderWords[index]] - 1) + ")";

	option.appendChild(optionWord);
	option.appendChild(languageOption);
	game.appendChild(option);
}

function updateRoundCount(roundNumber) {
	const round = document.getElementById("round");
	round.textContent = roundNumber;
}

function renderAsCorrect(e) {
	e.parentNode.classList.add("correct");
}

function renderAsIncorrect(e) {
	e.parentNode.classList.add("incorrect");
}

function renderCorrectAnswer(correctAnswer) {
	let answer = document.getElementById(correctAnswer);
	answer.parentElement.classList.add("showCorrect");
}

//Permite mostrar la barra que tiene en cuenta el tiempo
function renderTimer(game) {
	const scroll = document.createElement("div");
	scroll.classList.add("timer");
	scroll.setAttribute("id", "timer");

	document.getElementById("all").appendChild(scroll);
}

function renderOptionsGame() {
	//Game options div
	const optionsGame = document.createElement("div");
	optionsGame.setAttribute("class", "optionsGame");
	optionsGame.setAttribute("id", "optionsGame");

	//Settings
	const optionBox = document.createElement("div");
	optionBox.setAttribute("id", "optionBox");
	optionBox.setAttribute("class", "optionBox");
	//Setings SVG
	const imgOption = document.createElement("img");
	imgOption.setAttribute(
		"src",
		"view/assets/settings_FILL1_wght400_GRAD0_opsz40.svg"
	);
	imgOption.setAttribute("id", "settings");
	imgOption.setAttribute("alt", "settings");
	imgOption.setAttribute("class", "settings");

	optionBox.appendChild(imgOption);

	//Statistics
	const statisticsBox = document.createElement("div");
	statisticsBox.setAttribute("id", "statisticsBox");
	statisticsBox.setAttribute("class", "statisticsBox");
	//Statistics SVG
	const imgStatistics = document.createElement("img");
	imgStatistics.setAttribute(
		"src",
		"view/assets/leaderboard_FILL1_wght400_GRAD0_opsz40.svg"
	);
	imgStatistics.setAttribute("id", "statistics");
	imgStatistics.setAttribute("alt", "statistics");
	imgStatistics.setAttribute("class", "statistics");
	statisticsBox.appendChild(imgStatistics);

	optionsGame.appendChild(statisticsBox);
	optionsGame.appendChild(optionBox);

	document.getElementById("top").appendChild(optionsGame);
}

function gameOptionsSelectedAnimation(newDiv) {
	newDiv.setAttribute("id", "optionBoxSelected");
	newDiv.setAttribute("class", "optionBoxSelected");

	document.getElementById("all").appendChild(newDiv);
}

function renderSettings() {
	let newDiv = document.createElement("div");

	//Hide scrollbar
	document.getElementById("select").style.pointerEvents = "none";
	//Make background darker
	let auxBackground = document.createElement("div");
	auxBackground.setAttribute("class", "darkerBackground");
	auxBackground.setAttribute("id", "darkerBackground");

	setTimeout(() => {
		auxBackground.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
	}, 10);

	document.getElementById("all").appendChild(auxBackground);

	//Close icon
	let closeBox = document.createElement("div");
	closeBox.setAttribute("class", "closeBox");
	closeBox.setAttribute("id", "closeBox");

	let closeIcon = document.createElement("img");
	closeIcon.setAttribute("class", "closeIcon ");
	closeIcon.classList.add("unselectable", "closeIcon");
	closeIcon.setAttribute("id", "closeIcon ");
	closeIcon.setAttribute(
		"src",
		"view/assets/close_FILL0_wght400_GRAD0_opsz48.svg"
	);

	closeBox.appendChild(closeIcon);
	newDiv.appendChild(closeBox);

	//Dark mode option
	let darkModeBox = document.createElement("div");
	darkModeBox.setAttribute("id", "darkModeBox");

	let darkModeInput = document.createElement("input");
	darkModeInput.setAttribute("type", "checkbox");
	darkModeInput.setAttribute("id", "darkModeInput");

	let darkModeLabel = document.createElement("label");
	darkModeLabel.setAttribute("for", "darkModeInput");
	darkModeLabel.setAttribute("id", "darkModeLabel");
	darkModeLabel.classList.add("unselectable");

	cookieJSON = cookieToJSON();

	let auxLabelDarkText = "";
	if (cookieJSON["dark_theme"] == "on") {
		darkModeInput.checked = true;
		auxLabelDarkText = "Dark";
	} else {
		darkModeInput.checked = false;
		auxLabelDarkText = "Light";
	}

	cookieJSON = cookieToJSON();
	darkModeLabel.textContent = auxLabelDarkText;

	let darkModeText = document.createElement("h4");
	darkModeText.textContent = "Select theme: ";
	darkModeText.classList.add("unselectable");

	darkModeBox.appendChild(darkModeText);
	darkModeBox.appendChild(darkModeInput);
	darkModeBox.appendChild(darkModeLabel);
	newDiv.appendChild(darkModeBox);

	//Type of difficulty
	let difficultyBox = document.createElement("div");
	difficultyBox.setAttribute("id", "difficultyBox");

	let difficultyInput = document.createElement("input");
	difficultyInput.setAttribute("type", "checkbox");
	difficultyInput.setAttribute("id", "difficultyInput");

	let difficultyLabel = document.createElement("label");
	difficultyLabel.setAttribute("for", "difficultyInput");
	difficultyLabel.setAttribute("id", "difficultyLabel");
	difficultyLabel.classList.add("unselectable");

	let auxLabelDifficultyText = "";
	if (cookieJSON["difficulty"] == "progressive") {
		difficultyInput.checked = true;
		auxLabelDifficultyText = "Progressive";
	} else {
		difficultyInput.checked = false;
		auxLabelDifficultyText = "Random";
	}
	difficultyLabel.textContent = auxLabelDifficultyText;

	let difficultyText = document.createElement("h4");
	difficultyText.textContent = "Type difficulty: ";
	difficultyText.classList.add("unselectable");

	difficultyBox.appendChild(difficultyText);
	difficultyBox.appendChild(difficultyInput);
	difficultyBox.appendChild(difficultyLabel);
	newDiv.appendChild(difficultyBox);

	gameOptionsSelectedAnimation(newDiv);
}

function renderStatistics() {
	let newDiv = document.createElement("div");

	//Close icon
	let closeBox = document.createElement("div");
	closeBox.setAttribute("class", "closeBox");
	closeBox.setAttribute("id", "closeBox");

	let closeIcon = document.createElement("img");
	closeIcon.setAttribute("class", "closeIcon ");
	closeIcon.setAttribute("id", "closeIcon ");
	closeIcon.setAttribute(
		"src",
		"view/assets/close_FILL0_wght400_GRAD0_opsz48.svg"
	);

	closeBox.appendChild(closeIcon);
	newDiv.appendChild(closeBox);

	//Hide scrollbar
	document.getElementById("select").style.pointerEvents = "none";
	//Make background darker
	let auxBackground = document.createElement("div");
	auxBackground.setAttribute("class", "darkerBackground");
	auxBackground.setAttribute("id", "darkerBackground");

	setTimeout(() => {
		auxBackground.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
	}, 10);

	document.getElementById("all").appendChild(auxBackground);

	cookieJSON = cookieToJSON();

	//Max rounds
	const maxRoundsBox = document.createElement("div");
	maxRoundsBox.classList.add("maxRoundsBox");
	maxRoundsBox.setAttribute("id", "maxRoundsBox");

	const maxRoundsText = document.createElement("h5");
	maxRoundsText.classList.add("unselectable", "maxRoundsText");
	maxRoundsText.setAttribute("id", "maxRoundsText");
	maxRoundsText.innerHTML =
		"Max rounds: <b class='numberMaxRounds'>" +
		cookieJSON["max_round"] +
		"</b>";

	maxRoundsBox.appendChild(maxRoundsText);

	//Played Games
	const playedGamesBox = document.createElement("div");
	playedGamesBox.classList.add("playedGamesBox");
	playedGamesBox.setAttribute("id", "playedGamesBox");

	const playedGamesText = document.createElement("h5");
	playedGamesText.classList.add("unselectable", "playedGamesText");
	playedGamesText.setAttribute("id", "playedGamesText");
	playedGamesText.innerHTML =
		"Played games: <b class='playedGamesRounds'>" +
		cookieJSON["played_games"] +
		"</b>";

	playedGamesBox.appendChild(playedGamesText);

	newDiv.appendChild(maxRoundsBox);
	newDiv.appendChild(playedGamesBox);
	gameOptionsSelectedAnimation(newDiv);
}
