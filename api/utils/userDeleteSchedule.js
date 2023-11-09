import schedule from "node-schedule"
import sequelize from "../database/db.js";
import {transactionErrorHandler} from "../errors/handlers.js";
import retryError from "../errors/RetryError.js";

const Op = sequelize.Sequelize.Op

const rule = new schedule.RecurrenceRule()
rule.hour = 12
rule.minute = 0
rule.second = 0

const clearOldRecords = async () => {
    const dayBefore = new Date()
    dayBefore.setDate(dayBefore.getDate() - 1)

    sequelize.inTransaction(async transaction => {
        await Promise.all([
            sequelize.models.User.destroy({
                where: {
                    verified: false,
                    createdAt: {
                        [Op.lte]: dayBefore
                    }
                },
                transaction
            }),

            sequelize.models.Token.destroy({
                where: {
                    createdAt: {
                        [Op.lte]: dayBefore
                    }
                },
                transaction
            })
        ])
    })
        .then(() => {
            console.log("Deletion job executed") // TODO: need to log this
        })
        .catch(err => {
            transactionErrorHandler(retryError(clearOldRecords, err), null, null, null)
        })

}

const job = schedule.scheduleJob(rule, clearOldRecords)

export default job