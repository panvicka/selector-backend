import express from 'express';
import controller from '../controller/Person';

const router = express.Router();

router.post('/create', controller.createPerson);
router.get('/get/:personId', controller.readPerson);
router.get('/get/:personId/summary', controller.readPersonSummary);
router.get('/get/', controller.readAllPersons);
router.patch('/update/:personId', controller.updatePerson);
router.delete('/delete/:personId', controller.deletePerson);

export default router;
