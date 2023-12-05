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
						rule.where.id = req.body.filter[param];

					settings[param] = rule;
				}

			req.filterSettings = settings;
			next();
		} catch (err) {
			return next(
				new ServerError(`${rulesName} sort rules went wrong`, 500),
			);
		}
	};
}

function initRules() {
	if (rules) return;

	rules = {
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
				// where: {
				// 	id: {
				// 		[Op.lt]: 0,
				// 	},
				// },
				// where: {
				// 	id: {
				// 		[Op.is]: null,
				// 	},
				// },
			},
			categories: {
				model: models.Category,
				as: `categories`,
				where: {
					id: [],
				},
				required: true,
			},
		},
	};
}
