import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Point
 *   description: การจัดการคะแนนของผู้ใช้งาน (Point management API)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TriggerInput:
 *       type: object
 *       required:
 *         - activityCode
 *         - userId
 *       properties:
 *         activityCode:
 *           type: string
 *           description: The unique code of the activity (e.g., 'SIGNIN_DAILY')
 *         userId:
 *           type: string
 *           description: The ID of the user performing the activity
 *         referenceId:
 *           type: string
 *           description: Optional reference ID for the activity
 *         metadata:
 *           type: object
 *           description: Optional metadata for the activity
 *
 *     TriggerResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *           example: Activity received and processing
 *         payload:
 *           type: object
 *           properties:
 *             jobId:
 *               type: string
 */

/**
 * @swagger
 * /api/v1/point/trigger:
 *   post:
 *     summary: ส่งข้อมูลการทำกิจกรรมเพื่อรับคะแนน (Point Trigger)
 *     description: ส่งข้อมูลกิจกรรมที่ผู้ใช้งานทำมายังระบบเพื่อคำนวณและเพิ่มคะแนนให้ตามกติกา (Point Rule)
 *     tags: [Point]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TriggerInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TriggerResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PointTransaction:
 *       type: object
 *       properties:
 *         transaction_id:
 *           type: string
 *         user_id:
 *           type: string
 *         activity_id:
 *           type: integer
 *         display_name_th:
 *           type: string
 *         display_name_en:
 *           type: string
 *         rule_id:
 *           type: integer
 *         points_received:
 *           type: number
 *         reference_id:
 *           type: string
 *           nullable: true
 *         metadata:
 *           type: object
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         total_count:
 *           type: integer
 *           description: "Total count of transactions (for pagination, only in list response)"
 *
 *     PointTransactionListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *           example: ""
 *         payload:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PointTransaction'
 *
 *     PointTransactionDetailResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *           example: ""
 *         payload:
 *           $ref: '#/components/schemas/PointTransaction'
 *
 *     LeaderboardRow:
 *       type: object
 *       properties:
 *         rank:
 *           type: integer
 *         userId:
 *           type: string
 *         score:
 *           type: number
 *         lastActive:
 *           type: string
 *           format: date-time
 *
 *     LeaderboardResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         filter:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *             month:
 *               type: string
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LeaderboardRow'
 */

/**
 * @swagger
 * /api/v1/point/transaction/list:
 *   get:
 *     summary: ประวัติการรับ/ใช้คะแนน (Point Transactions)
 *     description: ดึงรายการประวัติการเพิ่มขึ้นหรือลดลงของคะแนนทั้งหมด พร้อมรองรับการกรองตาม userId
 *     tags: [Point]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PointTransactionListResponse'
 */

/**
 * @swagger
 * /api/v1/point/transaction/{id}:
 *   get:
 *     summary: รายละเอียดประวัติคะแนนตาม ID
 *     description: ดูรายละเอียดของรายการประวัติคะแนนที่ระบุตาม ID
 *     tags: [Point]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PointTransactionDetailResponse'
 *       404:
 *         description: Transaction not found
 */

/**
 * @swagger
 * /api/v1/point/leaderboard:
 *   get:
 *     summary: อันดับผู้ใช้งาน (Leaderboard)
 *     description: ดึงลำดับผู้ใช้งานที่มีคะแนนสะสมสูงสุด แบ่งตามรอบเวลา (ทั้งหมด หรือ รายเดือน)
 *     tags: [Point]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [OVERALL, MONTHLY]
 *           default: OVERALL
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           description: Format YYYY-MM (required if type is MONTHLY)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeaderboardResponse'
 */

const router = Router();
export default router;
