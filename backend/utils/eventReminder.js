const cron = require('node-cron');
const { Op } = require('sequelize');
const { User, Event, Registration } = require('../models');

const { sendMail } = require("./emailService");

const startEventReminder = () => {
    cron.schedule("0 9 * * *", async () => {
        try {
            const today = new Date();

            const reminderDate = new Date();
            reminderDate.setDate(today.getDate() + 2);

            const startOfDay = new Date(reminderDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(reminderDate.setHours(23, 59, 59, 999));

            const events = await Event.findAll({
                where: {
                    eventDate: {
                        [Op.between]: [startOfDay, endOfDay]
                    },
                    isDeleted: false
                },
                include: [
                    {
                        model: Registration,
                        where: {
                            status: "applied"
                        },
                        include: [
                            {
                                model: User,
                                attributes: ["id", "username", "email"]
                            }
                        ]
                    }
                ]
            });

            for (const event of events) {
                for (const reg of event.Registrations) {
                    await sendMail({
                        to: reg.User.email,
                        subject: `Reminder: ${event.title} is coming soon`,
                        text: `Hi ${reg.User.username}, reminder that "${event.title}" is on ${event.eventDate}.`
                    });
                }
            }

            console.log("Event reminder cron completed");
        } catch (err) {
            console.error("Reminder cron error:", err.message);
        }
    });
};

module.exports = { startEventReminder };