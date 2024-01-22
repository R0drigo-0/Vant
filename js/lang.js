let auxLang = navigator.language;
let pos = auxLang.indexOf("-");
auxLang = auxLang.substring(0, pos);

let html = document.documentElement;
html.lang = auxLang;
