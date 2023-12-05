import { query } from "express-validator";

const avaliableParams = [`nocomments`, `categories`, `admins`, `users`];

const splitQuery = async (query) => {
	return query?.split(`,`);
};

const queryArrToFilterParams = async (queryArr, { req }) => {
	const filterSettings = [];

	if (!queryArr) return true;

	queryArr.forEach((param) => {
		if (avaliableParams.indexOf(param) === -1)
			throw new Error(
				`Filtering parameter (${param}) doesn't valid. Available filtering parameters: [${avaliableParams}]`,
			);

		filterSettings.push(param);
	});
	req.body.filter = filterSettings;

	return true;
};

export default [
	query(`filter`).customSanitizer(splitQuery).custom(queryArrToFilterParams),
];
