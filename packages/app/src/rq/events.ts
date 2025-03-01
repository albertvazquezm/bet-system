import { createSportEventBet, getSportEvents } from "@/api/events";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSportEventsQueryKey } from "./query-keys";

export const useQueryGetSportEvents = () => {
    return useQuery({
        queryKey: getSportEventsQueryKey(),
        queryFn: () => getSportEvents(),
    });
};

export const useMutationCreateSportEventBet = () => {
    return useMutation({
        mutationFn: ({ eventId, betAmount }: { eventId: number, betAmount: number }) => createSportEventBet({ sport_event_id: eventId, bet_amount: betAmount }),
    });
};
