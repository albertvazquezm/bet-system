import { Request, Response } from 'express';
import { SportEventController } from '../sport-event.controller';
import { SportEvent } from '../sport-event.model';
import { SportEventBet } from '../sport-event-bet.model';
import createHttpError from 'http-errors';
import { ZodError } from 'zod';
// Mock the models
jest.mock('../sport-event.model');
jest.mock('../sport-event-bet.model');

describe('SportEventController', () => {
  let controller: SportEventController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    controller = new SportEventController();
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getAllSportEvents', () => {
    it('should return all sport events', async () => {
      const mockEvents = [
        { event_id: 1, name: 'Event 1' },
        { event_id: 2, name: 'Event 2' },
      ];
      (SportEvent.findAll as jest.Mock).mockResolvedValue(mockEvents);

      await controller.getAllSportEvents(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(SportEvent.findAll).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockEvents);
    });
  });

  describe('getSportEventById', () => {
    it('should return a sport event when found', async () => {
      const mockEvent = { event_id: 1, name: 'Event 1' };
      mockReq.params = { id: '1' };
      (SportEvent.findByPk as jest.Mock).mockResolvedValue(mockEvent);

      await controller.getSportEventById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(SportEvent.findByPk).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockEvent);
    });

    it('should throw 404 when sport event not found', async () => {
      mockReq.params = { id: '1' };
      (SportEvent.findByPk as jest.Mock).mockResolvedValue(null);

      await controller.getSportEventById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalledWith(
        expect.any(createHttpError.NotFound)
      );
    });
  });

  describe('createSportEvent', () => {
    it('should create a new sport event', async () => {
      const mockEventData = { event_name: 'New Event', odds: 1.0 };
      const mockCreatedEvent = { event_id: 1, ...mockEventData };
      mockReq.body = mockEventData;
      (SportEvent.create as jest.Mock).mockResolvedValue(mockCreatedEvent);

      await controller.createSportEvent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(SportEvent.create).toHaveBeenCalledWith(mockEventData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockCreatedEvent);
    });
    it('should throw a zod validation error when event_name is missing', async () => {
      const mockEventData = { odds: 1.0 };
      mockReq.body = mockEventData;

      await controller.createSportEvent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.any(ZodError)  
      );
    });
  });

  describe('updateSportEvent', () => {
    it('should update an existing sport event', async () => {
      const mockEventData = { event_name: 'Updated Event', odds: 1.0 };
      const mockUpdatedEvent = { event_id: 1, ...mockEventData };
      mockReq.params = { id: '1' };
      mockReq.body = mockEventData;
      (SportEvent.update as jest.Mock).mockResolvedValue([1]);
      (SportEvent.findByPk as jest.Mock).mockResolvedValue(mockUpdatedEvent);

      await controller.updateSportEvent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(SportEvent.update).toHaveBeenCalledWith(mockEventData, {
        where: { event_id: '1' },
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedEvent);
    });

    it('should throw 404 when sport event not found for update', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = { event_name: 'Updated Event', odds: 1.0 };
      (SportEvent.update as jest.Mock).mockResolvedValue([0]);

      await controller.updateSportEvent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.any(createHttpError.NotFound)
      );
    });
  });

  describe('deleteSportEvent', () => {
    it('should delete an existing sport event', async () => {
      mockReq.params = { id: '1' };
      (SportEvent.destroy as jest.Mock).mockResolvedValue(1);

      await controller.deleteSportEvent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(SportEvent.destroy).toHaveBeenCalledWith({
        where: { event_id: '1' },
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Sport event 1 deleted',
      });
    });

    it('should throw 404 when sport event not found for deletion', async () => {
      mockReq.params = { id: '1' };
      (SportEvent.destroy as jest.Mock).mockResolvedValue(0);

      await controller.deleteSportEvent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.any(createHttpError.NotFound)
      );
    });
  });

  describe('createSportEventBet', () => {
    it('should create a new sport event bet', async () => {
      const mockBetData = { sport_event_id: 1, bet_amount: 100 };
      const mockCreatedBet = { sport_event_bet_id: 1, ...mockBetData };
      mockReq.body = mockBetData;
      (SportEventBet.create as jest.Mock).mockResolvedValue(mockCreatedBet);

      await controller.createSportEventBet(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(SportEventBet.create).toHaveBeenCalledWith(mockBetData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockCreatedBet);
    });
  });
}); 