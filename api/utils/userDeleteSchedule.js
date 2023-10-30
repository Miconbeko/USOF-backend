const schedule = require(`node-schedule`)
const sequelize = require(`../database/db`)

const Op = sequelize.Sequelize.Op

const rule = new schedule.RecurrenceRule()
rule.hour = 12
rule.minute = 0
rule.second = 0

const job = schedule.scheduleJob(rule, async () => {
    const dayBefore = new Date()
    dayBefore.setDate(dayBefore.getDate() - 1)

    await sequelize.models.User.destroy({
        where: {
            isVerified: false,
            createdAt: {
                [Op.lte]: dayBefore
            }
        }
    })

    console.log("deleting") // TODO: need to log this
})

module.exports = job