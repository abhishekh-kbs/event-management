/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification APIs
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications for logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notification fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 5
 *                       type:
 *                         type: string
 *                         example: EVENT_DELETED
 *                       message:
 *                         type: string
 *                         example: Event "React Workshop" has been deleted
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-05-06T10:30:00.000Z"
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/notifications/unread-count:
 *   get:
 *     summary: Get notifications unread count
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread notification count fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notification fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 5
 *                       type:
 *                         type: string
 *                         example: EVENT_DELETED
 *                       message:
 *                         type: string
 *                         example: Event "React Workshop" has been deleted
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-05-06T10:30:00.000Z"
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/notifications/unread-notification:
 *   get:
 *     summary: Get unread notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread notification fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notification fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 5
 *                       type:
 *                         type: string
 *                         example: EVENT_DELETED
 *                       message:
 *                         type: string
 *                         example: Event "React Workshop" has been deleted
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-05-06T10:30:00.000Z"
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Notification marked as read
 *     tags: [Notifications]
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
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notification fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 5
 *                       type:
 *                         type: string
 *                         example: EVENT_DELETED
 *                       message:
 *                         type: string
 *                         example: Event "React Workshop" has been deleted
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-05-06T10:30:00.000Z"
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/notifications/mark-all-read:
 *   patch:
 *     summary: All notifications marked as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notifications fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 5
 *                       type:
 *                         type: string
 *                         example: EVENT_DELETED
 *                       message:
 *                         type: string
 *                         example: Event "React Workshop" has been deleted
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-05-06T10:30:00.000Z"
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Notifications deleted
 *     tags: [Notifications]
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
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notification fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 5
 *                       type:
 *                         type: string
 *                         example: EVENT_DELETED
 *                       message:
 *                         type: string
 *                         example: Event "React Workshop" has been deleted
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-05-06T10:30:00.000Z"
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       500:
 *         description: Internal Server Error
 */

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const {
    getAllNotifications,
    getUnreadCount,
    getUnreadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
} = require('../controllers/notificationController.js');

router.get('/', verifyToken, getAllNotifications);
router.get('/unread-count', verifyToken, getUnreadCount);
router.get('/unread-notification', verifyToken, getUnreadNotifications);
router.patch('/:id/read', verifyToken, markAsRead);
router.patch('/mark-all-read', verifyToken, markAllAsRead);
router.delete('/:id', verifyToken, deleteNotification);

module.exports = router;

