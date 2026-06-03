require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const db = require('./models');
const path = require('path');
const registrationRoutes = require('./routes/registration');
const pg = require('pg');
const { scheduleUserCleanup, scheduleEventCleanup, accountDeletionFeedbackCleanup, scheduleProductCleanup } = require('./utils/cleanupUsers');
const { startEventReminder } = require('./utils/eventReminder.js');
const { connectedUsers, setIO } = require('./utils/socketStore');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const logsRouter = require('./routes/logs');
const errorHandler = require('./middleware/errorHandler');
const { connectRedis } = require('./config/redisClient');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const notificationRoutes = require('./routes/notification');
const chatRoutes = require('./routes/chatRoutes');
const productRoutes = require('./routes/product');
const paymentRoutes = require('./routes/payments');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173',
            'http://192.168.5.155:5173'
        ],
        methods: ['GET', 'POST'],
        credentials: true
    }
});

setIO(io);

io.on('connection', (socket) => { // real time notifications
    console.log('User connected: ', socket.id);

    socket.on('join', (userId) => {
        connectedUsers[String(userId)] = socket.id;
        console.log(`User ${userId} joined with socket ${socket.id}`);
        console.log('All connected:', connectedUsers);
    });

    socket.on('disconnect', () => {
        Object.keys(connectedUsers).forEach(userId => {
            if (connectedUsers[userId] === socket.id) {
                delete connectedUsers[userId];
                console.log(`User ${userId} disconnected`);
            }
        });
    });
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Event Management API Docs',
    customCss: '.swagger-ui .topbar {background-color:  #1a1a2e}'
}));

app.set('trust proxy', 1);

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    })
);

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://192.168.5.155:5173'
    ],
    credentials: true
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/registrations', registrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/logs', logsRouter);
app.use('/api', chatRoutes);
app.use('/api', productRoutes);
app.use('/api/payments', paymentRoutes);


app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Server is working');
});

scheduleUserCleanup();
scheduleEventCleanup();
accountDeletionFeedbackCleanup();
startEventReminder();
scheduleProductCleanup();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        // console.log(db);
        // console.log(db.sequelize);
        await db.sequelize.authenticate();
        console.log("DB connected");

        await connectRedis();

        await db.sequelize.sync({ logging: false });

        server.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.log(`Startup error: ${err.message}`);
    }
};

startServer();

// db.sequelize.authenticate()
//     .then(() => {
//         console.log('DB connected');

//         return connectRedis();
//     })
//     .then(() => {
//         console.log("Redis connected");
//         return db.sequelize.sync({ logging: false });
//     })
//     .then(() => {

//         server.listen(PORT, "0.0.0.0", () => {
//             console.log(`Server running at http://localhost:${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error('Startup error:', err.message);
//     });




// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
// const { autoLogout } = require('./middleware/authMiddleware');
// const pgPool = new pg.Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// app.use(session({
//     store: new pgSession({
//         pool: pgPool,
//         tableName: 'session'
//     }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//         sameSite: 'none',
//         maxAge: 1000 * 60 * 60
//     }
// }));