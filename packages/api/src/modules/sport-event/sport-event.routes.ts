import { Router } from 'express';
import { SportEventController } from './sport-event.controller';

const router = Router();
const sportEventController = new SportEventController();

export const basePath = '/api/sport-events';

router.get(basePath, sportEventController.getAllSportEvents);
router.get(`${basePath}/:id`, sportEventController.getSportEventById);
router.post(basePath, sportEventController.createSportEvent);
router.put(`${basePath}/:id`, sportEventController.updateSportEvent);
router.delete(`${basePath}/:id`, sportEventController.deleteSportEvent);
router.post(`${basePath}/bets`, sportEventController.createSportEventBet);

export default router; 