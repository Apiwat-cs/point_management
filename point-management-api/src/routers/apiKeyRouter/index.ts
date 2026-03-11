import express from 'express';
import * as apiKeyController from '@/controllers/apiKeyController';

const routes = express.Router();

routes.get('/list', apiKeyController.getApiKeyList); //ดึงข้อมูล API Key

routes.get('/detail/:id', apiKeyController.getApiKeyById); //ดึงข้อมูล API Key ตาม id

routes.post('/detail', apiKeyController.createApiKey); //เพิ่ม API Key

routes.put('/detail/:id', apiKeyController.updateApiKey); //แก้ไข API Key

routes.delete('/detail/:id', apiKeyController.deleteApiKey); //ลบ API Key

export default routes;
