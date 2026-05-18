const cron = require('node-cron');
const { Op } = require('sequelize');
const { User, Event, AccountDeletionFeedback } = require('../models');

const scheduleUserCleanup = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

            const deleted = await User.unscoped().destroy({
                where: {
                    isDeleted: true,
                    deletedAt: { [Op.lte]: threeDaysAgo }
                },
                force: true,
            });

            console.log('Permanantly deleted all the users which were soft deleted before 3 days');
        }
        catch (err) {
            console.error(`Cleanup error: ${err.message}`);
        }
    })
}

const accountDeletionFeedbackCleanup = () => {
    cron.schedule('0 0 * * *', async () => {

        const tenDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

        const user = await User.findAll({
            where: {
                isDeleted: true,
                deletedAt: { [Op.lte]: tenDaysAgo }
            },
            attributes: ['id'],
        });

        const userIds = await user.map(info => info.id);

        const deleted = await AccountDeletionFeedback.unscoped().destroy({
            where: {
                id: { [Op.in]: userIds }
            },
        })

        console.log('Permanantly deleted all the feedbacks which were soft deleted before 3 days');
    });
}

const scheduleEventCleanup = () => {
    cron.schedule('0 0 * * *', async () => {

        try {
            const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
            // const toDelete = await Event.unscoped().findAll({
            //     where: {
            //         isDeleted: true,
            //         deletedAt: { [Op.lte]: threeDaysAgo }
            //     }
            // });

            const deleted = await Event.unscoped().destroy({
                where: {
                    isDeleted: true,
                    deletedAt: { [Op.lte]: threeDaysAgo }
                }
            });

            console.log(`Permanently deleted ${deleted} events soft-deleted 3+ days ago`);


        }
        catch (err) {
            console.error(`Cleanup error: ${err.message}`);
        }
    })
}

module.exports = { scheduleUserCleanup, scheduleEventCleanup, accountDeletionFeedbackCleanup };