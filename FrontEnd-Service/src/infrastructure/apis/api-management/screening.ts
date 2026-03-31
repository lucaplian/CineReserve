import {useAppSelector} from "@application/store";
import {Configuration} from "../client";
import { ScreeningAddRecord } from "../client/models/ScreeningAddRecord";
import { ScreeningUpdateRecord } from "../client/models/ScreeningUpdateRecord";
import { ScreeningApi } from "../client/apis/ScreeningApi";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {isEmpty} from "lodash";

/**
 * Use constants to identify mutations and queries.
 */
const getScreeningsQueryKey = "getScreeningsQuery";
const getScreeningQueryKey = "getScreeningQuery";
const addScreeningMutationKey = "addScreeningMutation";
const deleteScreeningMutationKey = "deleteScreeningMutation";
const updateScreeningMutationKey = "updateScreeningMutation";
    
const getFactory = (token: string | null) => new ScreeningApi(new Configuration({accessToken: token ?? ""}));

export const useGetScreenings = (page: number, pageSize: number, search: string = "") => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.

    return {
        ...useQuery({
            queryKey: [getScreeningsQueryKey, token, page, pageSize, search],
            queryFn: async () => await getFactory(token).apiScreeningGetPageGet({page, pageSize, search}),
            refetchInterval: Infinity, // Screening information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false // This disables fetching the screening information from the backend when focusing on the current window.
        }),
        queryKey: getScreeningsQueryKey
    };
}

export const useGetScreening = (id: string | null) => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.

    return {
        ...useQuery({
            queryKey: [getScreeningQueryKey, token, id],
            queryFn: async () => await getFactory(token).apiScreeningGetByIdIdGet({id: id ?? ""}),
            refetchInterval: Infinity, // Screening information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false, // This disables fetching the screening information from the backend when focusing on the current window.
            enabled: !isEmpty(id)
        }),
        queryKey: getScreeningQueryKey
    };
}

export const useAddScreening = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [addScreeningMutationKey, token],
        mutationFn: async (screeningAddRecord: ScreeningAddRecord) => {
            const result = await getFactory(token).apiScreeningAddPost({screeningAddRecord});
            await queryClient.invalidateQueries({queryKey: [getScreeningsQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getScreeningQueryKey], type: "all"});

            return result;
        }
    })
}

export const useDeleteScreening = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [deleteScreeningMutationKey, token],
        mutationFn: async (id: string) => {
            const result = await getFactory(token).apiScreeningDeleteIdDelete({id});
            await queryClient.invalidateQueries({queryKey: [getScreeningsQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getScreeningQueryKey], type: "all"});
            return result;
        }
    })
}

export const useUpdateScreening = () => {
    const {token} = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: [updateScreeningMutationKey, token],
        mutationFn: async (screeningUpdateRecord: ScreeningUpdateRecord) => {
            const result = await getFactory(token).apiScreeningUpdatePut({screeningUpdateRecord});
            await queryClient.invalidateQueries({queryKey: [getScreeningsQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getScreeningQueryKey], type: "all"});

            return result;
        }
    })
}