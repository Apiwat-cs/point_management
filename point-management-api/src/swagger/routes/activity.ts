import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: การจัดการข้อมูลกิจกรรมที่ใช้ในการสะสมคะแนน (Activity management API)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ActivityListResponse:
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
 *             type: object
 *             properties:
 *               activityID:
 *                 type: string
 *               code:
 *                 type: string
 *               displayTh:
 *                 type: string
 *               displayEn:
 *                 type: string
 *               createDate:
 *                 type: string
 *                 format: date-time
 *
 *     ActivityDetailResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *           example: ""
 *         payload:
 *           type: object
 *           properties:
 *             activityID:
 *               type: string
 *             code:
 *               type: string
 *             displayTh:
 *               type: string
 *             displayEn:
 *               type: string
 *             createDate:
 *               type: string
 *               format: date-time
 *
 *     ActivityInput:
 *       type: object
 *       required:
 *         - code
 *         - displayTh
 *       properties:
 *         code:
 *           type: string
 *         displayTh:
 *           type: string
 *         displayEn:
 *           type: string
 *
 *     GeneralResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *           example: ""
 *         payload:
 *           type: object
 *           nullable: true
 *           example: null
 */

/**
 * @swagger
 * /api/v1/activity/list:
 *   get:
 *     summary: รายการกิจกรรมทั้งหมด
 *     description: ดึงรายการกิจกรรมทั้งหมดที่รองรับในระบบ พร้อมรองรับการค้นหาและแบ่งหน้า
 *     tags: [Activity]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityListResponse'
 */

/**
 * @swagger
 * /api/v1/activity/detail/{id}:
 *   get:
 *     summary: รายละเอียดกิจกรรมตาม ID
 *     description: ดูรายละเอียดของกิจกรรมที่ระบุตาม ID (เช่น ชื่อกิจกรรมภาษาไทย/อังกฤษ, รหัสกิจกรรม)
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Activity ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityDetailResponse'
 */

/**
 * @swagger
 * /api/v1/activity/detail:
 *   post:
 *     summary: เพิ่มกิจกรรมใหม่
 *     description: สร้างกิจกรรมใหม่ในระบบ เพื่อใช้เป็นเงื่อนไขในการส่งคะแนน (Point Trigger)
 *     tags: [Activity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralResponse'
 */

/**
 * @swagger
 * /api/v1/activity/detail/{id}:
 *   put:
 *     summary: แก้ไขข้อมูลกิจกรรม
 *     description: แก้ไขรายละเอียดของกิจกรรมที่มีอยู่เดิมตาม ID
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Activity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralResponse'
 */

/**
 * @swagger
 * /api/v1/activity/detail/{id}:
 *   delete:
 *     summary: ลบกิจกรรม
 *     description: ลบข้อมูลกิจกรรมออกจากระบบอย่างถาวร
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Activity ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralResponse'
 */

const router = Router();
export default router;
