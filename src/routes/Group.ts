import express from 'express';
import controller from '../controller/Group';

const router = express.Router();

router.post('/create', controller.createGroup);
router.get('/get/:groupId', controller.readGroup);
router.get('/get/', controller.readAllGroups);
router.patch('/update/:groupId', controller.updateGroup);
router.delete('/delete/:groupId', controller.deleteGroup);

export default router;
