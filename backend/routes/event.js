/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event APIs
 */

/**
 * @swagger
 * /api/events/createEvents:
 *   post:
 *     summary: Create event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - organizer
 *               - category
 *               - venueName
 *               - venueAddress
 *               - priceAmount
 *               - priceCurrency
 *               - city
 *               - eventTimeStart
 *               - eventTimeEnd
 *               - numberOfGuests
 *               - capacityTotal
 *               - eventDate
 *               - shortDescription
 *               - fullDescription
 *               - registrationDeadline
 *               - visibleFrom
 *               - bookingOpenDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: React Workshop
 *               organizer:
 *                 type: string
 *                 example: Coding Ninjas
 *               category:
 *                 type: string
 *                 example: Technology
 *               username:
 *                 type: string
 *                 example: abhishek
 *               venueName:
 *                 type: string
 *                 example: CP67 Mall Auditorium
 *               venueAddress:
 *                 type: string
 *                 example: Sector 67, Mohali
 *               venueMapLink:
 *                 type: string
 *                 example: https://maps.google.com/example
 *               priceAmount:
 *                 type: number
 *                 example: 499
 *               priceCurrency:
 *                 type: string
 *                 example: INR
 *               isEarlyBird:
 *                 type: boolean
 *                 example: true
 *               eventTimeStart:
 *                 type: string
 *                 example: "10:00 AM"
 *               eventTimeEnd:
 *                 type: string
 *                 example: "02:00 PM"
 *               numberOfGuests:
 *                 type: integer
 *                 example: 50
 *               capacityTotal:
 *                 type: integer
 *                 example: 100
 *               eventDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-05-20"
 *               city:
 *                 type: string
 *                 example: Mohali
 *               shortDescription:
 *                 type: string
 *                 example: Learn React basics in one day
 *               fullDescription:
 *                 type: string
 *                 example: This workshop covers components, props, state, hooks and API integration.
 *               agenda:
 *                 type: string
 *                 example: Introduction, React basics, Hooks, Project
 *               prerequisites:
 *                 type: string
 *                 example: Basic JavaScript knowledge
 *               tags:
 *                 type: string
 *                 example: react,javascript,frontend
 *               registrationDeadline:
 *                 type: string
 *                 format: date
 *                 example: "2026-05-18"
 *               visibleFrom:
 *                 type: string
 *                 format: date
 *                 example: "2026-05-10"
 *               bookingOpenDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-05-11"
 *               fileUpload:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/events/view-events:
 *   get:
 *     summary: Get events in user profile
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 * 
 *     parameters:
 *       - in: query
 *         name: city
 *         required: false
 *         schema:
 *           type: string
 *         example: Mohali
 * 
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         example: Technology
 * 
 *       - in: query
 *         name: title
 *         required: false
 *         schema:
 *           type: string
 *         example: React Workshop
 * 
 *       - in: query
 *         name: venueName
 *         required: false
 *         schema:
 *           type: string
 *         example: CP67 Mall Auditorium
 * 
 *       - in: query
 *         name: eventCode
 *         required: false
 *         schema:
 *           type: string
 *         example: EVT123
 * 
 *       - in: query
 *         name: state
 *         required: false
 *         schema:
 *           type: string
 *         example: Punjab
 * 
 *       - in: query
 *         name: minPrice
 *         required: false
 *         schema:
 *           type: number
 *         example: 100
 * 
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         schema:
 *           type: number
 *         example: 1000
 * 
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-05-01
 * 
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-05-31
 * 
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         example: 1
 * 
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         example: 10
 * 
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [createdAt, eventDate, priceAmount, title]
 *         example: createdAt
 * 
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         example: desc
 * 
 *     responses:
 *       200:
 *         description: Events fetched successfully
 * 
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Event fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/routes/event/getAllEvents'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /api/events/my-events:
 *   get:
 *     summary: Get my event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My events fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/routes/event/getMyEvents'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /api/events/{id}:
 *   patch:
 *     summary: Update event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Event Title
 *               city:
 *                 type: string
 *                 example: Mohali
 *               priceAmount:
 *                 type: number
 *                 example: 999
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *               - password
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Event cancelled due to personal reason"
 *               feedback:
 *                 type: string
 *                 example: "Please improve cancellation flow"
 *               password:
 *                 type: string
 *                 example: "Qwer!234"
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       400:
 *         description: Invalid ID / Missing fields / Invalid password
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */

const express = require('express');
const router = express.Router();
const { isCreator, verifyToken } = require('../middleware/authMiddleware.js');
const { editBtnLimiter, createBtnLimiter, deleteBtnLimiter } = require('../middleware/rateLimiter.js');
const upload = require('../utils/upload');
const validate = require('../middleware/validate');
const { createEventSchema, updateEventSchema } = require('../validator/event.validator')
const {
    events,
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    getMyEvents,
    deleteEvent
} = require('../controllers/eventController.js');

router.get('/events', events);
router.get('/view-events', getAllEvents);
router.get('/my-events', verifyToken, getMyEvents);
router.post(
    '/createEvents', verifyToken, validate(createEventSchema),
    isCreator, createBtnLimiter,
    upload.single('fileUpload'),
    createEvent
);
router.get('/:id', getEventById);
router.patch('/:id', verifyToken, validate(updateEventSchema), isCreator, editBtnLimiter, upload.single('fileUpload'), updateEvent);
router.delete('/:id', verifyToken, isCreator, deleteBtnLimiter, deleteEvent);

module.exports = router;