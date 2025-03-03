import { z } from 'zod';

// Schema for creating a new sport event
export const CreateSportEventSchema = z.object({
    event_name: z.string().min(1, 'Event name is required'),
    odds: z.number().min(0, 'Odds must be a positive number').max(100, 'Odds must be less than 100'),
});

// Schema for updating an existing sport event
export const UpdateSportEventSchema = CreateSportEventSchema.partial();

// Schema for creating a new sport event bet
export const CreateSportEventBetSchema = z.object({
    sport_event_id: z.number().min(1, 'Sport event ID is required'),
    bet_amount: z.number().min(0, 'Bet amount must be a positive number'),
});

// Infer types from the schemas
export type CreateSportEventDto = z.infer<typeof CreateSportEventSchema>;
export type UpdateSportEventDto = z.infer<typeof UpdateSportEventSchema>;
export type CreateSportEventBetDto = z.infer<typeof CreateSportEventBetSchema>;

export type SportEventDto = {
    event_id: number;
    event_name: string;
    odds: number;
    created_at: Date;
    updated_at: Date;
};

export type GetAllSportEventsDto = SportEventDto[]
