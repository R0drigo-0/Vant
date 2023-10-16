cookieJSON = cookieToJSON();

function changeTheme() {
	let link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	if (cookieJSON["dark_theme"] == "on" || !cookieJSON["dark_theme"]) {
		link.setAttribute("href", "view/css/dark.css");
	} else {
		link.setAttribute("href", "view/css/light.css");
	}

	link.setAttribute("id", "themeLink");
	document.head.appendChild(link);
}

changeTheme();
