/**
 * @description Function to check the url
 *
 */

function checkForURL(url) {
	console.log("::: Running checkForURL :::", url);

	let url_pattern1 = /(http(s)?:\/\/)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

	if (url.match(url_pattern1)) {
		return true;
	} else {
		return false;
	}
}

export { checkForURL };
