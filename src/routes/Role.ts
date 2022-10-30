import express from 'express';
import controller from '../controller/Role';

const router = express.Router();

router.post('/create', controller.createRole);
router.get('/get/:roleId', controller.readRole);
router.get('/get/', controller.readAllRoles);
router.patch('/update/:roleId', controller.updateRole);
router.delete('/delete/:roleId', controller.deleteRole);

export default router;
