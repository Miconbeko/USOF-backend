import createObligatoryValidator from "./validators/createObligatoryValidator.js"

import passwordRegisterValidator from "./validators/passwordRegisterValidator.js"
import loginRegisterValidator from "./validators/loginRegisterValidator.js"
import emailRegisterValidator from "./validators/emailRegisterValidator.js"
import loginOrEmailValidator from "./validators/loginOrEmailValidator.js"
import queryTokenValidator from "./validators/queryTokenValidator.js"


export { passwordRegisterValidator, loginRegisterValidator, emailRegisterValidator, loginOrEmailValidator, queryTokenValidator }

export const passwordValidator = createObligatoryValidator(`password`)
export const tokenValidator = createObligatoryValidator(`token`)

export const registerValidator = [passwordRegisterValidator, loginRegisterValidator, emailRegisterValidator]
export const loginInValidator = [loginOrEmailValidator, passwordValidator]