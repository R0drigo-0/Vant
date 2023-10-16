//Borra todos los elementos del DOM que puedan afectar a la ronda
function removePreviousRound() {
	const game = document.getElementById("game");
	game.remove();
}

function removeRoundCounter() {
	const counter = document.getElementById("roundBox");
	counter.style.display = "none";
}

//Permite modificar el DOM y borrar el menu de seleccion de idioma
function removeSelectLangugage() {
	let menuSelect = document.getElementById("select");
	menuSelect.remove();

	remove = true;
}

function removeRetryGame() {
	document.getElementById("endGameQuestion").remove();
}

function removeTimer(deltaTime = 0) {
	let timer = document.getElementById("timer");
	setTimeout(() => {
		timer.remove();
	}, deltaTime);
}

function removeOptionsGame() {
	document.getElementById("optionBox").parentElement.remove();
}

function removeSettings() {
	document.getElementById("select").style.pointerEvents = "all";

	document.getElementById("optionBoxSelected").style.animation =
		"gameOptionsUnselected 0.55s forwards";

	document.getElementById("darkerBackground").style.background = "#ffffff00";

	setTimeout(() => {
		document.getElementById("darkerBackground").remove();
		document.getElementById("optionBoxSelected").remove();
	}, 500);
}
