import { Request, Response, NextFunction } from 'express';
import { SportEvent } from './sport-event.model';
import { CreateSportEventSchema, UpdateSportEventSchema } from './sport-event.dto';
import { asyncHandler } from '../common/common.utils';
import createHttpError from 'http-errors';

export class SportEventController {
  getAllSportEvents = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const sportEvents = await SportEvent.findAll();
    res.status(200).json(sportEvents);
  });

  getSportEventById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const sportEvent = await SportEvent.findByPk(id);
    if (!sportEvent) {
      throw createHttpError.NotFound(`Sport event ${id} not found`);
    }
    res.status(200).json(sportEvent);
  });

  createSportEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const sportEventData = CreateSportEventSchema.parse(req.body);
    const sportEvent = await SportEvent.create(sportEventData);
    res.status(201).json(sportEvent);
  });

  updateSportEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const sportEventData = UpdateSportEventSchema.parse(req.body);
    const [updatedCount] = await SportEvent.update(sportEventData, { where: { event_id: id } });
    if (updatedCount === 0) {
      throw createHttpError.NotFound(`Sport event ${id} not found`);
    }
    const updatedSportEvent = await SportEvent.findByPk(id);
    res.status(200).json(updatedSportEvent);
  });

  deleteSportEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedCount = await SportEvent.destroy({ where: { event_id: id } });
    if (deletedCount === 0) {
      throw createHttpError.NotFound(`Sport event ${id} not found`);
    }
    res.status(200).json({ message: `Sport event ${id} deleted` });
  });
} 