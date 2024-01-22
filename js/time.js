function decreaseTimer(time) {
	if (!endGame) {
		updateTimerStyle(time);
		let aux = setTimeout(() => {
			time--;
			updateTimerStyle(time);
			if (time > 0) decreaseTimer(time);
		}, 1000);
		aux;
	}

	if (nextRound == true) {
		clearTimeout(aux);
	}
}

function updateTimerStyle(time) {
	/*

	const timer = document.getElementById("timer");
	let auxWidth = 0;
	if (time == 0) width = 0;
	timer.style.width = auxWidth.toString() + "%";
	*/
}
