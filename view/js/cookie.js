function cookieToJSON() {
	let cookieArray = document.cookie.split("; ");
	let cookieObject = {};

	cookieArray.forEach(function (pair) {
		let nameValue = pair.split("=");
		let name = nameValue[0];
		let value = nameValue[1];

		cookieObject[name] = value;
	});

	return cookieObject;
}
