import {useAppSelector} from "@application/store";
import {Configuration, MovieAddRecord, MovieUpdateRecord, MovieApi} from "../client";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {isEmpty} from "lodash";

/**
 * Use constants to identify mutations and queries.
 */
const getMoviesQueryKey = "getMoviesQuery";
const getMovieQueryKey = "getMovieQuery";
const addMovieMutationKey = "addMovieMutation";
const deleteMovieMutationKey = "deleteMovieMutation";
const updateMovieMutationKey = "updateMovieMutation";
    
const getFactory = (token: string | null) => new MovieApi(new Configuration({accessToken: token ?? ""}));

export const useGetMovies = (page: number, pageSize: number, search: string = "") => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.

    return {
        ...useQuery({
            queryKey: [getMoviesQueryKey, token, page, pageSize, search],
            queryFn: async () => await getFactory(token).apiMovieGetPageGet({page, pageSize, search}),
            refetchInterval: Infinity, // Movie information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false // This disables fetching the movie information from the backend when focusing on the current window.
        }),
        queryKey: getMoviesQueryKey
    };
}

export const useGetMovie = (id: string | null) => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.

    return {
        ...useQuery({
            queryKey: [getMovieQueryKey, token, id],
            queryFn: async () => await getFactory(token).apiMovieGetByIdIdGet({id: id ?? ""}),
            refetchInterval: Infinity, // Movie information may not be frequently updated so refetching the data periodically is not necessary.
            refetchOnWindowFocus: false, // This disables fetching the movie information from the backend when focusing on the current window.
            enabled: !isEmpty(id)
        }),
        queryKey: getMovieQueryKey
    };
}

export const useAddMovie = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [addMovieMutationKey, token],
        mutationFn: async (movieAddRecord: MovieAddRecord) => {
            const result = await getFactory(token).apiMovieAddPost({movieAddRecord});
            await queryClient.invalidateQueries({queryKey: [getMoviesQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getMovieQueryKey], type: "all"});

            return result;
        }
    })
}

export const useDeleteMovie = () => {
    const {token} = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [deleteMovieMutationKey, token],
        mutationFn: async (id: string) => {
            const result = await getFactory(token).apiMovieDeleteIdDelete({id});
            await queryClient.invalidateQueries({queryKey: [getMoviesQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getMovieQueryKey], type: "all"});
            return result;
        }
    })
}

export const useUpdateMovie = () => {
    const {token} = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: [updateMovieMutationKey, token],
        mutationFn: async (movieUpdateRecord: MovieUpdateRecord) => {
            const result = await getFactory(token).apiMovieUpdatePut({movieUpdateRecord});
            await queryClient.invalidateQueries({queryKey: [getMoviesQueryKey], type: "all"});  // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            await queryClient.invalidateQueries({queryKey: [getMovieQueryKey], type: "all"});

            return result;
        }
    })
}