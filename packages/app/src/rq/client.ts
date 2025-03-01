import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { handleQueryClientError, isApiError } from "./error-handler";

export const createQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                throwOnError: (error: unknown) => {
                    if (isApiError(error)) {
                        // Only throw on non client errors (400-499)
                        return error.status < 400 || error.status >= 500;
                    }
                    return true;
                },
            }
        },
        queryCache: new QueryCache({
            onError: handleQueryClientError,
        }),
        mutationCache: new MutationCache({
            onError: handleQueryClientError,
        }),
    });
}
