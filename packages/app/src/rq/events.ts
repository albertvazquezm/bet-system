import { getSportEvents } from "@/api/events";
import { useQuery } from "@tanstack/react-query";
import { getSportEventsQueryKey } from "./query-keys";

export const useQueryGetSportEvents = () => {
    return useQuery({
        queryKey: getSportEventsQueryKey(),
        queryFn: () => getSportEvents(),
    });
};
/*
export const useMutationUpdateItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: ({ id, data }: { id: string, data: any }) => updateItem(id, data),
        onSuccess: (updatedItem) => {
            queryClient.setQueryData(getItemQueryKey(updatedItem.id), updatedItem)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            queryClient.setQueryData(getItemsQueryKey(), (old: any) => [...old.map((item: any) => item.id !== updatedItem.id ? item : updatedItem)])
        }
    });
};

export const useMutationCreateItemEvent = () => {
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: ({ id, itemEvent }: { id: string, itemEvent: any }) => createItemEvent(id, itemEvent),
    });
};*/