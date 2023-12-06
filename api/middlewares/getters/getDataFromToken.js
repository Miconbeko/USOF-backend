import jwt from "jsonwebtoken";
import ServerError from "../../errors/ServerError.js";

export default async (req, res, next) => {
	try {
		req.token = jwt.verify(req.body.token, process.env.JWT_KEY);
	} catch (err) {
		return next(new ServerError(`Invalid or expired token`, 401));
	}
	next();
};
