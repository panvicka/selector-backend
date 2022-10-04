import express from 'express';
import controller from '../controller/RotationItem';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post(
    '/create',
    ValidateSchema(Schemas.rotationItem.create),
    controller.createRotationItem
);
router.get('/get/:rotationItemId', controller.readRotationItem);
router.get('/get/', controller.readAllRotationItems);
router.patch(
    '/update/:rotationItemId',
    ValidateSchema(Schemas.rotationItem.update),
    controller.updateRotationItem
);
router.delete('/delete/:rotationItemId', controller.deleteRotationItem);

export default router;
