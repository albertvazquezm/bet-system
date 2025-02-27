import { z } from 'zod';

// Schema for creating a new sport event
export const CreateSportEventSchema = z.object({
    event_name: z.string().min(1, 'Event name is required'),
    odds: z.number().min(0, 'Odds must be a positive number').max(100, 'Odds must be less than 100'),
});

// Schema for updating an existing sport event
export const UpdateSportEventSchema = CreateSportEventSchema.partial();

// Infer types from the schemas
export type CreateSportEventDto = z.infer<typeof CreateSportEventSchema>;
export type UpdateSportEventDto = z.infer<typeof UpdateSportEventSchema>;
