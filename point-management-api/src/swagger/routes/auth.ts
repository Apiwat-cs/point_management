import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: การจัดการการเข้าสู่ระบบและยืนยันตัวตน (Authentication management API)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignInInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: admin
 *         password:
 *           type: string
 *           format: password
 *           example: password123
 *
 *     RefreshTokenInput:
 *       type: object
 *       required:
 *         - refToken
 *       properties:
 *         refToken:
 *           type: string
 *           description: Refresh Token ที่ได้รับจากการ Sign-in
 *
 *     AuthUserAccount:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         username:
 *           type: string
 *         fullName:
 *           type: string
 *         avatar:
 *           type: string
 *           nullable: true
 *         isActive:
 *           type: boolean
 *         permission:
 *           type: string
 *         userRole:
 *           type: string
 *
 *     AuthUserPayload:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         name:
 *           type: string
 *         activeAccount:
 *           $ref: '#/components/schemas/AuthUserAccount'
 *         Accounts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AuthUserAccount'
 *         unActiveAccounts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AuthUserAccount'
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *         payload:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 *             user:
 *               $ref: '#/components/schemas/AuthUserPayload'
 *
 *     UserMeResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *         payload:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/AuthUserPayload'
 */

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: เข้าสู่ระบบ (Sign-in)
 *     description: เข้าสู่ระบบด้วย username และ password เพื่อรับ JWT Token (Access Token และ Refresh Token) สำหรับใช้ในการเรียก API เส้นอื่นๆ
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInInput'
 *     responses:
 *       200:
 *         description: เข้าสู่ระบบสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Username หรือ Password ไม่ถูกต้อง
 */

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: ต่ออายุ Token (Refresh Token)
 *     description: ใช้ Refresh Token เพื่อขอ Access Token ใหม่ เมื่อ Access Token เดิมหมดอายุ
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenInput'
 *     responses:
 *       200:
 *         description: ต่ออายุ Token สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 */

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: รายละเอียดผู้ใช้งานที่เข้าระบบ (Get Me)
 *     description: ดึงข้อมูลโปรไฟล์และสิทธิ์การใช้งานของผู้ใช้งานที่กำลัง Login อยู่ในปัจจุบัน
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserMeResponse'
 *       401:
 *         description: ไม่ได้รับอนุญาต (Token ไม่ถูกต้องหรือหมดอายุ)
 */

const router = Router();
export default router;
