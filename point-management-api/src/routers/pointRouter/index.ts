import express from 'express';
import { triggerPoint, getTransactions, getTransactionDetail, getLeaderboard } from '@/controllers/pointController';

const router = express.Router();

router.post('/trigger', triggerPoint); //เพิ่มคะแนน

router.get('/transaction/list', getTransactions); //ดึงข้อมูลการเปลี่ยนแปลงคะแนน

router.get('/transaction/:id', getTransactionDetail); //ดึงข้อมูลการเปลี่ยนแปลงคะแนนตาม id

router.get('/leaderboard', getLeaderboard); //ดึงข้อมูล leaderboard

export default router;
