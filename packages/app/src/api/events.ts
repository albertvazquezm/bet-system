import { CreateSportEventBetDto } from '@bet-system/dto';
import { apiFetcher } from './api-fetcher';

export const getSportEvents = async () => {
    const response = await apiFetcher('/sport-events', {
        method: 'GET',
    });
    return response;
};

export const createSportEventBet = async (data: CreateSportEventBetDto) => {
    const response = await apiFetcher('/sport-events/bets', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    return response;
};