//Permite eliminar caracteres que afecten a la base de datos
function sanitize(str) {
	return str
		.substring(0, 10)
		.replace(/[^0-9]/gi, " ")
		.replace(/\b(drop|delete|truncate|insert|update)\b/gi, "");
}
