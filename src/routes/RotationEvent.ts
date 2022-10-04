import express from 'express';
import controller from '../controller/RotationEvent';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post(
    '/create',
    ValidateSchema(Schemas.rotationEvent.create),
    controller.createRotationEvent
);
router.get('/get/:rotationEventId', controller.readRotationEvent);
router.get('/get/', controller.readAllRotationEvents);
router.patch(
    '/update/:rotationEventId',
    ValidateSchema(Schemas.rotationEvent.update),
    controller.updateRotationEvent
);
router.delete('/delete/:rotationEventId', controller.deleteRotationEvent);

export default router;
