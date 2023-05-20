import express from 'express';
import controller from '../controller/Team';

const router = express.Router();

router.post('/create', controller.createTeam);
router.get('/get/:teamId', controller.readTeam);
router.get('/get/', controller.readAllTeams);
router.patch('/update/:teamId', controller.updateTeam);
router.delete('/delete/:teamId', controller.deleteTeam);

export default router;
