// const fs = require('fs');
// const path = require('path');

// const logFile = path.join(__dirname, '../logs/activity.txt');

// const userLogActivity = (req, user, action, role) => {
//     console.log('Log path:', logFile);
//     const time = new Date().toISOString();

//     const ip =
//         req.headers['x-forwarded-for']?.split(',')[0] ||
//         req.socket?.remoteAddress ||
//         req.ip;

//     const entry = `[${time}] UserID: ${user.id} | UserName: ${user.username} | IP: ${ip} | Action: ${action} | Role: ${user.role}\n`;
//     fs.appendFile(logFile, entry, (err) => {
//         if (err) {
//             console.log('Log error:', err);
//         };
//     });
// };

// const creatorLogActivity = (req, data) => {
//     ensureLogDir();
//     const entry = `[${new Date().toISOString()}] EventCode: ${data.eventCode} | Organizer: ${data.organizer} | User: ${data.user} | IP: ${getIP(req)} | Action: ${data.action} | Role: ${data.role}\n`;
//     fs.appendFile(creatorLogFile, entry, (err) => {
//         if (err) console.error('Creator log error:', err);
//     });
// };

// // const creatorLogActivity = (req, data) => {
// //     console.log('Log path:', logFile);
// //     const time = new Date().toISOString();

// //     const ip =
// //         req.headers['x-forwarded-for']?.split(',')[0] ||
// //         req.socket?.remoteAddress ||
// //         req.ip;

// //     const entry = `[${time}] UserName: ${data.name} |  EventCode: ${data.eventCode} | Organizer: ${data.organizer} | User: ${data.user} | IP: ${ip} | Action: ${data.action} | Role: ${data.role}\n`;

// //     fs.appendFile(logFile, entry, (err) => {
// //         if (err) {
// //             console.log('Log error:', err);
// //         };
// //     });
// // };

// module.exports = { userLogActivity, creatorLogActivity };


const fs = require('fs');
const path = require('path');

const getIP = (req) =>
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    req.ip || 'unknown';

const logFile = path.join(__dirname, '../logs/activity.txt'); // back to one file

const formatValue = (value) => {
    return value === undefined || value === null || value === ''
        ? 'NA'
        : value;
}

const userLogActivity = (req, user, action) => {
    const entry = `[${new Date().toISOString()}] TYPE: user | UserUserName: ${formatValue(user.username)} | IP: ${formatValue(getIP(req))} | Action: ${formatValue(action)} | Role: ${formatValue(user.role)}\n`;
    fs.appendFile(logFile, entry, err => { if (err) console.error(err); });
};

const creatorLogActivity = (req, data) => {
    const entry = `[${formatValue(new Date().toISOString())}] TYPE: creator | EventCode: ${formatValue(data.eventCode)} | Organizer: ${formatValue(data.organizer)} | UserName: ${formatValue(data.user)} | IP: ${getIP(req)} | Action: ${formatValue(data.action)} | Role: ${data.role}\n`;
    fs.appendFile(logFile, entry, err => { if (err) console.error(err); });
};

module.exports = { userLogActivity, creatorLogActivity };