import express from 'express';
import controller from '../controller/RotationEvent';

const router = express.Router();

router.post('/create', controller.createRotationEvent);
router.get('/get/:rotationEventId', controller.readRotationEvent);
router.get('/get/', controller.readAllRotationEvents);
router.patch('/update/:rotationEventId', controller.updateRotationEvent);
router.delete('/delete/:rotationEventId', controller.deleteRotationEvent);

export default router;
