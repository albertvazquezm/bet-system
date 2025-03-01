import { CreateSportEventBetDto } from '@bet-system/dto';
export const getSportEvents = async () => {
    const response = await fetch('http://localhost:4000/sport-events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const createSportEventBet = async (data: CreateSportEventBetDto) => {
    const response = await fetch('http://localhost:4000/sport-events/bets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};