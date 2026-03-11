import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: App Token
 *   description: การจัดการ App Token (API Key) สำหรับระบบภายนอก (API Key/App Token management)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiKeyInput:
 *       type: object
 *       required:
 *         - systemName
 *         - environment
 *         - expiredAt
 *       properties:
 *         systemName:
 *           type: string
 *           description: ชื่อระบบที่ขอใช้งาน (เช่น LINE, MobileApp)
 *           example: ExternalSystem
 *         environment:
 *           type: string
 *           description: สภาพแวดล้อมที่ใช้งาน (เช่น DEV, PROD)
 *           example: DEV
 *         expiredAt:
 *           type: string
 *           format: date-time
 *           description: วันที่หมดอายุของ Token
 *           example: "2025-12-31T23:59:59Z"
 *
 *     ApiKeyUpdateInput:
 *       type: object
 *       required:
 *         - isActive
 *       properties:
 *         isActive:
 *           type: boolean
 *           description: สถานะการใช้งาน (true = ใช้งาน, false = ระงับการใช้งาน)
 *
 *     ApiKeyItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         system_name:
 *           type: string
 *         environment:
 *           type: string
 *         is_active:
 *           type: boolean
 *         expired_at:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     ApiKeyListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *         payload:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ApiKeyItem'
 *
 *     ApiKeyDetailResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *         payload:
 *           $ref: '#/components/schemas/ApiKeyItem'
 *
 *     ApiKeyCreateResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *           example: API Key created successfully
 *         payload:
 *           type: object
 *           properties:
 *             fullKey:
 *               type: string
 *               description: "ค่า API Key ตัวเต็ม (ให้นำไปใส่ใน Header x-api-key)"
 *             secretKey:
 *               type: string
 *               description: Secret Key สำหรับระบบ
 */

/**
 * @swagger
 * /api/v1/apiKey/list:
 *   get:
 *     summary: รายการ App Token ทั้งหมด
 *     description: ดึงรายการ App Token (API Key) ทั้งหมดที่มีในระบบ พร้อมรองรับการค้นหาและแบ่งหน้า
 *     tags: [App Token]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiKeyListResponse'
 */

/**
 * @swagger
 * /api/v1/apiKey/detail/{id}:
 *   get:
 *     summary: รายละเอียด App Token ตาม ID
 *     description: ดูรายละเอียดของ App Token ที่ระบุตาม ID (เช่น ชื่อระบบ, วันหมดอายุ, สถานะ)
 *     tags: [App Token]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiKeyDetailResponse'
 *       404:
 *         description: ไม่พบ App Token
 */

/**
 * @swagger
 * /api/v1/apiKey/detail:
 *   post:
 *     summary: สร้าง App Token ใหม่
 *     description: สร้าง App Token สำหรับให้ระบบภายนอกใช้เชื่อมต่อกับ API โดยจะได้รับ Full Key กลับมาเพียงครั้งเดียวเท่านั้น
 *     tags: [App Token]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiKeyInput'
 *     responses:
 *       201:
 *         description: สร้างสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiKeyCreateResponse'
 */

/**
 * @swagger
 * /api/v1/apiKey/detail/{id}:
 *   put:
 *     summary: แก้ไขสถานะ App Token
 *     description: เปิดหรือปิดการใช้งาน App Token ที่ระบุ
 *     tags: [App Token]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiKeyUpdateInput'
 *     responses:
 *       200:
 *         description: อัปเดตสำเร็จ
 */

/**
 * @swagger
 * /api/v1/apiKey/detail/{id}:
 *   delete:
 *     summary: ลบ App Token
 *     description: ลบ App Token ออกจากระบบอย่างถาวร
 *     tags: [App Token]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

const router = Router();
export default router;
