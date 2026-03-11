import { Router } from 'express';
import { getPointRules, getPointRuleDetail, createPointRule, updatePointRule, deletePointRule } from '@/controllers/masterDataController';

const router = Router();

router.get('/list', getPointRules); //ดึงข้อมูลกติกา

router.get('/detail/:id', getPointRuleDetail); //ดึงข้อมูลกติกาตาม id

router.post('/detail', createPointRule); //เพิ่มกติกาว่ากิจกรรมนี้ได้ตะแนนเท่าไหร่

router.put('/detail/:id', updatePointRule); //แก้ไขกติกา

router.delete('/detail/:id', deletePointRule); //ลบกติกา

export default router;
