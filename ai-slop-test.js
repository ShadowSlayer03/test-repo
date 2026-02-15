
var foo = foo;
var unusedVar = 123;
function doNothing() { }

function insecureEval(userInput) {
	return eval(userInput);
}
const password = "supersecret";

function uncoveredFunction(x) {
	if (x > 10) {
		return 'big';
	} else if (x < 0) {
		return 'negative';
	} else {
		return 'small';
	}
}

function legacyApi(version, deprecatedParam) {
	return `legacy v${version}`;
}
