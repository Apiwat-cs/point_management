import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Point Rule
 *   description: การจัดการกติกาการให้คะแนนสำหรับแต่ละกิจกรรม (Point rule management API)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PointRuleListResponse:
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
 *               id:
 *                 type: string
 *               activityId:
 *                 type: integer
 *               activityCode:
 *                 type: string
 *               activityName:
 *                 type: string
 *               point:
 *                 type: number
 *               status:
 *                 type: string
 *                 example: active
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *
 *     PointRuleDetailResponse:
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
 *             id:
 *               type: string
 *             activityId:
 *               type: integer
 *             point:
 *               type: number
 *             status:
 *               type: string
 *               example: active
 *             updatedAt:
 *               type: string
 *               format: date-time
 *
 *     PointRuleInput:
 *       type: object
 *       properties:
 *         activityId:
 *           type: integer
 *         point:
 *           type: number
 *         status:
 *           type: string
 *           description: "true/false or 'active'/'inactive'"
 *
 *     PointRuleUpdateInput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         status:
 *           type: string
 *           description: "true/false or 'active'/'inactive'"
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
 * /api/v1/pointRule/list:
 *   get:
 *     summary: รายการกติกาการให้คะแนน
 *     description: ดึงรายการกติกาการให้คะแนนทั้งหมด (เช่น กิจกรรมนี้ได้กี่คะแนน)
 *     tags: [Point Rule]
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
 *               $ref: '#/components/schemas/PointRuleListResponse'
 */

/**
 * @swagger
 * /api/v1/pointRule/detail/{id}:
 *   get:
 *     summary: รายละเอียดกติกาตาม ID
 *     description: ดูรายละเอียดของกติกาการให้คะแนนที่ระบุตาม ID
 *     tags: [Point Rule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Point rule ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PointRuleDetailResponse'
 */

/**
 * @swagger
 * /api/v1/pointRule/detail:
 *   post:
 *     summary: เพิ่มกติกาการให้คะแนนใหม่
 *     description: สร้างกติกาใหม่เพื่อระบุจำนวนคะแนนที่จะได้รับเมื่อทำกิจกรรมที่กำหนด
 *     tags: [Point Rule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PointRuleInput'
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
 * /api/v1/pointRule/detail/{id}:
 *   put:
 *     summary: แก้ไขกติกาการให้คะแนน
 *     description: แก้ไขรายละเอียดกติกาการให้คะแนนที่มีอยู่เดิมตาม ID (เช่น เปลี่ยนสถานะการใช้งาน)
 *     tags: [Point Rule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Point rule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PointRuleUpdateInput'
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
 * /api/v1/pointRule/detail/{id}:
 *   delete:
 *     summary: ลบกติกาการให้คะแนน
 *     description: ลบกติกาการให้คะแนนออกจากระบบอย่างถาวร
 *     tags: [Point Rule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Point rule ID
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
