import ServerError from "../../errors/ServerError.js";
import sequelize from "../../database/db.js";

const models = sequelize.models;
const Sequelize = sequelize.Sequelize;
const Op = sequelize.Sequelize.Op;
let rules;

export default function getFilterRules(rulesName) {
	return (req, res, next) => {
		initRules();

		try {
			const settings = {};

			if (req.body.filter)
				for (const param of Object.keys(req.body.filter)) {
					const rule = rules[rulesName][param];

					if (!rule)
						return next(
							new ServerError(
								`Filter rule "${param}" can't be applied to "${rulesName}"`,
								400,
							),
						);
					if (param === `categories`)
						rule.include.where.id = req.body.filter[param];
					if (param === `search`) {
						if (rulesName === `posts`) {
							rule.where[Op.or][0].title[Op.regexp] =
								req.body.filter[param].soft.toString();
							rule.where[Op.or][1].content[Op.regexp] =
								req.body.filter[param].soft.toString();
						}
						if (rulesName === `users`) {
							rule.where.login[Op.regexp] =
								req.body.filter[param].soft.toString();
						}
						if (rulesName === `categories`) {
							rule.where.title[Op.regexp] =
								req.body.filter[param].soft.toString();
						}
						console.log(rule.where);
					}

					settings[param] = rule;
				}

			req.filterSettings = settings;
			next();
		} catch (err) {
			console.error(err);
			return next(
				new ServerError(`${rulesName} filter rules went wrong`, 500),
			);
		}
	};
}

function initRules() {
	if (rules) return;

	rules = {
		categories: {
			search: {
				where: {
					title: {
						[Op.regexp]: null,
					},
				},
			},
		},
		users: {
			admins: {
				where: {
					role: `admin`,
				},
			},
			users: {
				where: {
					role: `user`,
				},
			},
			search: {
				where: {
					login: {
						[Op.regexp]: null,
					},
				},
			},
		},
		posts: {
			nocomments: {
				include: {
					model: models.Comment,
					as: `Comments`,
					attributes: [`id`],
					required: false,
				},
				where: {
					"$Comments.id$": null,
				},
			},
			categories: {
				include: {
					model: models.Category,
					as: `categories`,
					where: {
						id: [],
					},
					required: true,
				},
			},
			search: {
				where: {
					[Op.or]: [
						{
							title: {
								[Op.regexp]: null,
							},
						},
						{
							content: {
								[Op.regexp]: null,
							},
						},
					],
				},
			},
		},
	};
}
