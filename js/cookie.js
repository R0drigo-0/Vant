function cookieToJSON() {
  const cookieArray = document.cookie.split("; ");
  const cookieObject = {};

  cookieArray.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieObject[name] = decodeURIComponent(value);
  });

  return cookieObject;
}
