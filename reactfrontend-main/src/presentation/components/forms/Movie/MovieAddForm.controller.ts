import { MovieAddFormController, MovieAddFormModel } from "./MovieAddForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useAddMovie } from "@infrastructure/apis/api-management/movie";
import { useCallback } from "react";
import { GenreEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import React from "react";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: MovieAddFormModel) => {
    const defaultValues = {
        title: "",
        description: "",
        duration: 0,
        genre: "" as GenreEnum,
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

/**
 * Create a hook to get the validation schema.
 */
const useInitMovieAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        
        title: yup.string()
            .required("Title is required")
            .default(defaultValues.title),
        description: yup.string()
            .required("Description is required")
            .default(defaultValues.description),
        duration: yup.number()
            .required("Duration is required")
            .min(1, "Duration must be at least 1 minute")
            .default(defaultValues.duration),
        genre: yup.string()
             .oneOf([ 
                GenreEnum.Action,
                GenreEnum.Comedy,
                GenreEnum.Drama,
                GenreEnum.Horror,
                GenreEnum.Romance,
                GenreEnum.SciFi,
                GenreEnum.Thriller,
                GenreEnum.Documentary,
                GenreEnum.Animation,
                GenreEnum.Adventure,
                GenreEnum.Fantasy
            ])
            .required("Genre is required")
            .default(defaultValues.genre),
        
        
    });
        


    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useMovieAddFormController = (onSubmit?: () => void): MovieAddFormController => {
    const { defaultValues, resolver } = useInitMovieAddForm();
    const { mutateAsync: add, status } = useAddMovie();
    const queryClient = useQueryClient();
    const submit = useCallback((data: MovieAddFormModel) => // Create a submit callback to send the form data to the backend.
        add(data).then(() => {
            if (onSubmit) {
                onSubmit();
            }
        }), [add, queryClient]);
    const cancelOption = useCallback(() => {
            if (onSubmit) {
                onSubmit();
            }
        }, [queryClient]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<MovieAddFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectGenre = useCallback((event: SelectChangeEvent<GenreEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("genre", event.target.value as GenreEnum, {
            shouldValidate: true,
        });
    }, [setValue]);
    
    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectGenre,
            cancelOption
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending" // Return if the form is still submitting or not.
        },
        state: {
            errors // Return what errors have occurred when validating the form input.
        }
    }
}