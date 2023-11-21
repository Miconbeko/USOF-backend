import { query } from "express-validator"

const avaliableParams = [`nocomments`, `categories`, `admins`, `users`]

const splitQuery = async (query) => {
    return query?.split(`,`)
}

const queryArrToFilterParams = async (queryArr, { req }) => {
    const filterSettings = {}

    if (!queryArr)
        return true

    queryArr.forEach(fullParam => {
        let [ param, value ] = fullParam?.split(`:`)

        if (avaliableParams.indexOf(param) === -1)
            throw new Error(`Filtering parameter (${param}) doesn't valid. Available filtering parameters: [${avaliableParams}]`)

        value = value?.split(`.`)

        filterSettings[param] = { value }
    })
    console.log(filterSettings)
    req.body.filter = filterSettings

    return true
}

export default [
    query(`filter`)
        .customSanitizer(splitQuery)
        .custom(queryArrToFilterParams)
]