import {useAppSelector} from "@application/store";
import {Configuration} from "../client";
import { HallAddRecord } from "../client/models/HallAddRecord";
import { HallUpdateRecord } from "../client/models/HallUpdateRecord";
import { HallApi } from "../client/apis/HallApi";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {isEmpty} from "lodash";

/**
 * Use constants to identify mutations and queries.
 */
const getHallsQueryKey = "getHallsQuery";
const getHallQueryKey = "getHallQuery";
const addHallMutationKey = "addHallMutation";
const deleteHallMutationKey = "deleteHallMutation";
const updateHallMutationKey = "updateHallMutation";
    
const getFactory = (token: string | null) => new HallApi(new Configuration({accessToken: token ?? ""}));

export const useGetHalls = (page: number, pageSize: number, search: string = "") => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.

    return {
        ...useQuery({
            queryKey: [getHallsQueryKey, token, page, pageSize, search],
            queryFn: async () => await getFactory(token).apiHallGetPageGet({page, pageSize, search}),
            refetchInterval: Infinity, // Hall information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false // This disables fetching the hall information from the backend when focusing on the current window.
        }),
        queryKey: getHallsQueryKey
    };
}

export const useGetHall = (id: string | null) => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.

    return {
        ...useQuery({
            queryKey: [getHallQueryKey, token, id],
            queryFn: async () => await getFactory(token).apiHallGetByIdIdGet({id: id ?? ""}),
            refetchInterval: Infinity, // Hall information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false, // This disables fetching the hall information from the backend when focusing on the current window.
            enabled: !isEmpty(id)
        }),
        queryKey: getHallQueryKey
    };
}

export const useAddHall = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [addHallMutationKey, token],
        mutationFn: async (hallAddRecord: HallAddRecord) => {
            const result = await getFactory(token).apiHallAddPost({hallAddRecord});
            await queryClient.invalidateQueries({queryKey: [getHallsQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getHallQueryKey], type: "all"});

            return result;
        }
    })
}

export const useDeleteHall = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [deleteHallMutationKey, token],
        mutationFn: async (id: string) => {
            const result = await getFactory(token).apiHallDeleteIdDelete({id});
            await queryClient.invalidateQueries({queryKey: [getHallsQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getHallQueryKey], type: "all"});
            return result;
        }
    })
}

export const useUpdateHall = () => {
    const {token} = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: [updateHallMutationKey, token],
        mutationFn: async (hallUpdateRecord: HallUpdateRecord) => {
            const result = await getFactory(token).apiHallUpdatePut({hallUpdateRecord});
            await queryClient.invalidateQueries({queryKey: [getHallsQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getHallQueryKey], type: "all"});

            return result;
        }
    })
}