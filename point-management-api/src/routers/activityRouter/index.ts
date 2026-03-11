import { Router } from 'express';
import { getActivities, getActivityDetail, createActivity, updateActivity, deleteActivity } from '@/controllers/masterDataController';

const router = Router();

router.get('/list', getActivities); //ดึงข้อมูลกิจกรรม

router.get('/detail/:id', getActivityDetail); //ดึงข้อมูลกิจกรรมตาม id

router.post('/detail', createActivity); //เพิ่มกิจกรรม

router.put('/detail/:id', updateActivity); //แก้ไขกิจกรรม

router.delete('/detail/:id', deleteActivity); //ลบกิจกรรม

export default router;
