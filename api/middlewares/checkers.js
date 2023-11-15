import createTokenTypeChecker from "./checkers/createTokenTypeChecker.js";

import checkEmailOrLoginExists from "./checkers/checkEmailOrLoginExists.js";
import checkVerified from "./checkers/checkVerified.js";
import checkNotVerified from "./checkers/checkNotVerified.js";
import checkPassword from "./checkers/checkPassword.js";
import checkToken from "./checkers/checkToken.js";
import checkOwner from "./checkers/checkOwner.js";
import checkAdmin from "./checkers/checkAdmin.js";
import checkLocked from "./checkers/checkLocked.js";
import checkNotLocked from "./checkers/checkNotLocked.js";


export { checkEmailOrLoginExists, checkVerified, checkNotVerified,
    checkPassword, checkToken, checkOwner,
    checkAdmin, checkLocked, checkNotLocked }

export const checkTokenTypeVerify = createTokenTypeChecker(`verify`)
export const checkTokenTypePswReset = createTokenTypeChecker(`pswReset`)
export const checkTokenTypeSession = createTokenTypeChecker(`session`)
export const checkTokenTypeDelete = createTokenTypeChecker(`delete`)
export const checkTokenTypeLock = createTokenTypeChecker(`lock`)

export const checkTokenVerify = [checkToken, checkTokenTypeVerify]
export const checkTokenPswReset = [checkToken, checkTokenTypePswReset]
export const checkTokenSession = [checkToken, checkTokenTypeSession]
export const checkTokenDelete = [checkToken, checkTokenTypeDelete]
export const checkTokenLock = [checkToken, checkTokenTypeLock]