import { useTableController } from "../Table.controller";
import { useGetHalls, useDeleteHall, useUpdateHall } from "@infrastructure/apis/api-management/hall";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Pagination.controller";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useHallTableController = (search: string = "") => {
    const queryClient = useQueryClient(); // Get the query client.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const { data, isError, isLoading, queryKey } = useGetHalls(page, pageSize, search); // Retrieve the table page from the backend via the query hook.
    const { mutateAsync: remove } = useDeleteHall(); // Use a mutation to remove an entry.
    const { mutateAsync: update } = useUpdateHall(); // Use a mutation to update an entry.

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey], type: "all" }),
        [queryClient, queryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    const tableController = useTableController(setPagination, data?.response?.pageSize); // Adapt the pagination for the table.

    return { // Return the controller state and actions.
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        update,
        remove
    };
}