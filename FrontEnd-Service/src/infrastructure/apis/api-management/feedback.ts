import {useAppSelector} from "@application/store";
import {Configuration, FeedbackAddRecord, FeedbackUpdateRecord, FeedbackApi} from "../client";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {isEmpty} from "lodash";

/**
 * Use constants to identify mutations and queries.
 */
const getFeedbacksQueryKey = "getFeedbacksQuery";
const getFeedbackQueryKey = "getFeedbackQuery";
const addFeedbackMutationKey = "addFeedbackMutation";
const deleteFeedbackMutationKey = "deleteFeedbackMutation";
const updateFeedbackMutationKey = "updateFeedbackMutation";
    
const getFactory = (token: string | null) => new FeedbackApi(new Configuration({accessToken: token ?? ""}));

export const useGetFeedbacks = (page: number, pageSize: number, search: string = "") => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    
    return {
        ...useQuery({
            queryKey: [getFeedbacksQueryKey, token, page, pageSize, search],
            queryFn: async () => await getFactory(token).apiFeedbackGetPageGet({page, pageSize, search}),
            refetchInterval: Infinity, // Screening information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false // This disables fetching the screening information from the backend when focusing on the current window.
        }),
        queryKey: getFeedbacksQueryKey
    };
}

export const useGetFeedback = (id: string | null) => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.

    return {
        ...useQuery({
            queryKey: [getFeedbackQueryKey, token, id],
            queryFn: async () => await getFactory(token).apiFeedbackGetByIdIdGet({id: id ?? ""}),
            refetchInterval: Infinity, // Screening information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false, // This disables fetching the screening information from the backend when focusing on the current window.
            enabled: !isEmpty(id)
        }),
        queryKey: getFeedbackQueryKey
    };
}

export const useAddFeedback = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [addFeedbackMutationKey, token],
        mutationFn: async (feedbackAddRecord: FeedbackAddRecord) => {
            const result = await getFactory(token).apiFeedbackAddPost({feedbackAddRecord});
            await queryClient.invalidateQueries({queryKey: [getFeedbacksQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getFeedbackQueryKey], type: "all"});

            return result;
        }
    })
}

export const useDeleteFeedback = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [deleteFeedbackMutationKey, token],
        mutationFn: async (id: string) => {
            const result = await getFactory(token).apiFeedbackDeleteIdDelete({id});
            await queryClient.invalidateQueries({queryKey: [getFeedbacksQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getFeedbackQueryKey], type: "all"});
            return result;
        }
    })
}

export const useUpdateFeedback = () => {
    const {token} = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: [updateFeedbackMutationKey, token],
        mutationFn: async (feedbackUpdateRecord: FeedbackUpdateRecord) => {
            const result = await getFactory(token).apiFeedbackUpdatePut({feedbackUpdateRecord});
            await queryClient.invalidateQueries({queryKey: [getFeedbacksQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getFeedbackQueryKey], type: "all"});
            return result;
        }
    })
}