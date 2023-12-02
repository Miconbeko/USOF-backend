import sequelize from "../../database/db.js";
import ServerError from "../../errors/ServerError.js";
import { transactionErrorHandler } from "../../errors/handlers.js";
import retryError from "../../errors/RetryError.js";

const Op = sequelize.Sequelize.Op;
const models = sequelize.models;

export default function getUsersByIds(req, res, next) {
	sequelize
		.inTransaction(async (transaction) => {
			return await models.User.findAll({
				where: {
					id: req.body.ids,
				},
				transaction,
			});
		})
		.then((users) => {
			if (!users || users.length === 0)
				return next(new ServerError(`Users not found`, 404));

			req.users = users;
			next();
		})
		.catch((err) => {
			return transactionErrorHandler(
				retryError(getUsersByIds, err),
				req,
				res,
				next,
			);
		});
}
