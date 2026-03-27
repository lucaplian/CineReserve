import { FeedbackEditFormController, FeedbackEditFormModel } from "./FeedbackEditForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateFeedback} from "@infrastructure/apis/api-management/feedback";
import { useCallback } from "react";
import { GenreEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { FeedbackRecord } from "@infrastructure/apis/client/models/";
/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (feedback: FeedbackRecord | null, initialData?: FeedbackEditFormModel) => {
    const defaultValues = {
        id: feedback?.id || "",
        rating : feedback?.rating || 0,
        comment : feedback?.comment || "",
        wouldRecommend : feedback?.wouldRecommend || false,
        movieId : feedback?.movieId || "",
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
const useInitFeedbackEditForm = (feedback: FeedbackRecord | null) => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues(feedback);

    const schema = yup.object().shape({
        rating: yup.number()
            .required("Rating is required")
            .min(0, "Rating must be at least 0")
            .max(10, "Rating must be at most 10")
            .default(defaultValues.rating),
        comment: yup.string()
            .required("Comment is required")
            .default(defaultValues.comment),
        wouldRecommend: yup.boolean()
            .default(defaultValues.wouldRecommend),
        movieId: yup.string()
            .required("Movie is required")
            .default(defaultValues.movieId),
                
        
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useFeedbackEditFormController = (feedback: FeedbackRecord | null, onSubmit?: () => void): FeedbackEditFormController => {
    const { defaultValues, resolver } = useInitFeedbackEditForm(feedback);
    const { mutateAsync: add, status } = useUpdateFeedback();
    const queryClient = useQueryClient();
    const submit = useCallback((data: FeedbackEditFormModel) => // Create a submit callback to send the form data to the backend.
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
    } = useForm<FeedbackEditFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
    });

    const selectRating = useCallback((event: SelectChangeEvent<number>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("rating", event.target.value as number, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectMovie = useCallback((event: SelectChangeEvent<string>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("movieId", event.target.value as string, {
            shouldValidate: true,
        });
    }, [setValue]); 

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectRating,
            cancelOption,
            selectMovie
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