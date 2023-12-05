import { query } from "express-validator";
import splitQuery from "../../utils/splitQuery.js";
import splitQueryParams from "../../utils/splitQueryParams.js";

const avaliableParams = [`nocomments`, `categories`, `admins`, `users`];

const queryArrToFilterParams = async (queryArr, { req }) => {
	const filterSettings = {};

	if (!queryArr) return true;

	queryArr.forEach((fullParam) => {
		let [param, values] = splitQueryParams(fullParam);
		console.log([param, values]);

		if (avaliableParams.indexOf(param) === -1)
			throw new Error(
				`Filtering parameter (${param}) doesn't valid. Available filtering parameters: [${avaliableParams}]`,
			);
		if (param === `categories`)
			values = values.split(`,`).map((value) => parseInt(value));

		filterSettings[param] = values;
	});
	req.body.filter = filterSettings;

	return true;
};

export default [
	query(`filter`).customSanitizer(splitQuery).custom(queryArrToFilterParams),
];
