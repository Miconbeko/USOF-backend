import createTokenTypeChecker from "./checkers/createTokenTypeChecker.js";

import checkEmailOrLoginExists from "./checkers/checkEmailOrLoginExists.js";
import checkVerified from "./checkers/checkVerified.js";
import checkNotVerified from "./checkers/checkNotVerified.js";
import checkPassword from "./checkers/checkPassword.js";
import checkToken from "./checkers/checkToken.js";


export { checkEmailOrLoginExists, checkVerified, checkNotVerified, checkPassword, checkToken }

export const checkTokenTypeVerify = createTokenTypeChecker(`verify`)
export const checkTokenTypePswReset = createTokenTypeChecker(`pswReset`)
export const checkTokenTypeSession = createTokenTypeChecker(`session`)

export const checkTokenVerify = [checkToken, checkTokenTypeVerify]
export const checkTokenPswReset = [checkToken, checkTokenTypePswReset]
export const checkTokenSession = [checkToken, checkTokenTypeSession]