import {useAppSelector} from "@application/store";
import {Configuration, BookingAddRecord, BookingUpdateRecord, BookingApi} from "../client";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {isEmpty} from "lodash";

/**
 * Use constants to identify mutations and queries.
 */
const getBookingsQueryKey = "getBookingsQuery";
const getBookingQueryKey = "getBookingQuery";
const addBookingMutationKey = "addBookingMutation";
const deleteBookingMutationKey = "deleteBookingMutation";
const updateBookingMutationKey = "updateBookingMutation";
    
const getFactory = (token: string | null) => new BookingApi(new Configuration({accessToken: token ?? ""}));

export const useGetBookings = (page: number, pageSize: number, search: string = "") => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.

    return {
        ...useQuery({
            queryKey: [getBookingsQueryKey, token, page, pageSize, search],
            queryFn: async () => await getFactory(token).apiBookingGetPageGet({page, pageSize, search}),
            refetchInterval: Infinity, // Screening information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false // This disables fetching the screening information from the backend when focusing on the current window.
        }),
        queryKey: getBookingsQueryKey
    };
}

export const useGetBooking = (id: string | null) => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.

    return {
        ...useQuery({
            queryKey: [getBookingQueryKey, token, id],
            queryFn: async () => await getFactory(token).apiBookingGetByIdIdGet({id: id ?? ""}),
            refetchInterval: Infinity, // Screening information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false, // This disables fetching the screening information from the backend when focusing on the current window.
            enabled: !isEmpty(id)
        }),
        queryKey: getBookingQueryKey
    };
}

export const useAddBooking = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [addBookingMutationKey, token],
        mutationFn: async (bookingAddRecord: BookingAddRecord) => {
            const result = await getFactory(token).apiBookingAddPost({bookingAddRecord});
            await queryClient.invalidateQueries({queryKey: [getBookingsQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getBookingQueryKey], type: "all"});

            return result;
        }
    })
}

export const useDeleteBooking = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [deleteBookingMutationKey, token],
        mutationFn: async (id: string) => {
            const result = await getFactory(token).apiBookingDeleteIdDelete({id});
            await queryClient.invalidateQueries({queryKey: [getBookingsQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getBookingQueryKey], type: "all"});
            return result;
        }
    })
}

export const useUpdateBooking = () => {
    const {token} = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: [updateBookingMutationKey, token],
        mutationFn: async (bookingUpdateRecord: BookingUpdateRecord) => {
            const result = await getFactory(token).apiBookingUpdatePut({bookingUpdateRecord});
            await queryClient.invalidateQueries({queryKey: [getBookingsQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getBookingQueryKey], type: "all"});
            return result;
        }
    })
}