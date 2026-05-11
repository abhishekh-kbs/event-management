const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const logFile = path.join(__dirname, '../logs/activity.txt');

    let logs = [];

    try {

        const content = fs.readFileSync(logFile, 'utf8');
        const lines = content.trim().split('\n').filter(Boolean);

        logs = lines.map(line => {
            // parse: [timestamp] UserID: x | UserName: x | IP: x | Action: x | Role: x
            const timestamp = line.match(/\[(.*?)\]/)?.[1] || '';
            const userId = line.match(/UserID:\s*(\S+)/)?.[1] || '-';
            const ip = line.match(/IP:\s*(\S+)/)?.[1] || '-';
            const action = line.match(/Action:\s*([^|]+)/)?.[1]?.trim() || '-';
            const role = line.match(/Role:\s*(\S+)/)?.[1] || '-';
            const eventCode = line.match(/EventCode:\s*(\S+)/)?.[1] || '-';
            const username = line.match(/UserName:\s*([^|]+)/)?.[1]?.trim() || '-';
            const type = line.match(/TYPE:\s*(\S+)/)?.[1] || '-';
            const organizer = line.match(/Organizer:\s*([^|]+)/)?.[1]?.trim() || '-';


            return { timestamp, userId, username, type, organizer, ip, action, role, eventCode };
        }).reverse(); // newest first

    } catch (err) {
        logs = [];
    }

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Activity Logs</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; background: #0f0f1a; color: #e0e0e0; padding: 20px; }
                h1 { color: #7c6af7; margin-bottom: 20px; font-size: 24px; }
                .stats { display: flex; gap: 15px; margin-bottom: 25px; }
                .stat { background: #1a1a2e; padding: 15px 25px; border-radius: 8px; text-align: center; }
                .stat h3 { color: #7c6af7; font-size: 28px; }
                .stat p { color: #888; font-size: 12px; margin-top: 4px; }
                input { background: #1a1a2e; border: 1px solid #333; color: #fff; padding: 8px 15px; border-radius: 6px; width: 300px; margin-bottom: 15px; }
                table { width: 100%; border-collapse: collapse; }
                th { background: #1a1a2e; color: #7c6af7; padding: 12px; text-align: left; font-size: 13px; }
                td { padding: 10px 12px; border-bottom: 1px solid #1a1a2e; font-size: 13px; }
                tr:hover td { background: #1a1a2e; }
                .badge { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
                .LOGIN { background: #1a3a1a; color: #4caf50; }
                .REGISTER { background: #1a2a3a; color: #2196f3; }
                .LOGOUT { background: #3a1a1a; color: #f44336; }
                .DELETED { background: #3a2a1a; color: #ff9800; }
                .creator { color: #7c6af7; }
                .user { color: #4caf50; }
                .time { color: #888; font-size: 11px; }
            </style>
        </head>
        <body>
            <h1>📊 Activity Log Dashboard</h1>

            <div class="stats">
                <div class="stat">
                    <h3>${logs.length}</h3>
                    <p>Total Activities</p>
                </div>
                <div class="stat">
                    <h3>${logs.filter(l => l.action === 'LOGIN').length}</h3>
                    <p>Total Logins</p>
                </div>
                <div class="stat">
                    <h3>${logs.filter(l => l.action === 'REGISTER').length}</h3>
                    <p>Registrations</p>
                </div>
                <div class="stat">
                    <h3>${logs.filter(l => l.role === 'creator').length}</h3>
                    <p>Creator Actions</p>
                </div>
            </div>

            <input type="text" id="search" placeholder="🔍 Search by user, action, IP..." onkeyup="filterLogs()" />

            <table id="logsTable">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>User</th>
                        <th>Role</th>
                        <th>Action</th>
                        <th>IP</th>
                        <th>Organizer</th>
                        <th>Event Code</th>
                    </tr>
                </thead>
                <tbody>
                    ${logs.map(log => `
                        <tr>
                            <td class="time">${new Date(log.timestamp).toLocaleString('en-IN')}</td>
                            <td class="user">${log.username !== '-' ? log.username : ''} ${log.userId !== '-' ? `<small style="color:#666">#${log.userId}</small>` : ''}</td>
                            <td class="${log.role}">${log.role}</td>
                            <td><span class="badge ${log.action.split(' ')[0]}">${log.action}</span></td>
                            <td style="color:#888">${log.ip}</td>
                            <td>${log.organizer !== '-' ? log.organizer : 'NA'} ${log.userId !== '-' ? `<small style="color:#666">#${log.userId}</small>` : ''}</td>
                            <td style="color:#7c6af7">${log.eventCode !== '-' ? log.eventCode : 'NA'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <script>
                function filterLogs() {
                    const search = document.getElementById('search').value.toLowerCase();
                    const rows = document.querySelectorAll('#logsTable tbody tr');
                    rows.forEach(row => {
                        row.style.display = row.textContent.toLowerCase().includes(search) ? '' : 'none';
                    });
                }
            </script>
        </body>
        </html>
    `);
});

module.exports = router;