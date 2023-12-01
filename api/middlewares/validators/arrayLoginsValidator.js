import { body } from "express-validator";

export default [
  body(`logins`, `Logins is obligatory field`)
    .exists()
    .bail()
    .isArray({ min: 1, max: 50 })
    .withMessage(`Logins should be an array and have from 1 to 50 logins`),
];
