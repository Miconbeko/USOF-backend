import { query } from "express-validator"

const avaliableParams = [`rating`, `name`, `date`]

const splitQuery = async (query) => {
    return query?.split(`,`)
}

const queryArrToSortParams = async (queryArr, { req }) => {
    const sortSettings = {}

    if (!queryArr)
        return true

    queryArr.forEach(fullParam => {
        const [ param, order ] = fullParam?.split(`:`)

        if (avaliableParams.indexOf(param) === -1)
            throw new Error(`Sorting parameter (${param}) doesn't valid. Available sorting parameters: [${avaliableParams}]`)

        sortSettings[param] = {
            isAscending: order === `asc`
        }
    })
    req.body.sort = sortSettings

    return true
}

export default [
    query(`sort`)
        .customSanitizer(splitQuery)
        .custom(queryArrToSortParams)
]