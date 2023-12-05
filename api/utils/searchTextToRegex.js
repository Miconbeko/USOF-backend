function toWords(text) {
	let words = [
		...new Set(
			text
				.trim()
				.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, "")
				.split(/[\s]+/),
		),
	];

	return words;
}

function textToRegexStrict(text) {
	const words = toWords(text);
	const lookaheads = words.map((word) => `(?=.*\\b${word}\\b)`);

	return new RegExp(lookaheads.join(``), `i`);
}

function textToRegexSoft(text) {
	const words = toWords(text);

	return new RegExp(`\\b(?:${words.join(`|`)})\\b`, `i`);
}

const textToRegex = {
	strict: textToRegexStrict,
	soft: textToRegexSoft,
};

export default textToRegex;
