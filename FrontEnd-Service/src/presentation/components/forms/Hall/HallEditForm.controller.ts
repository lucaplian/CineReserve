import { HallAddFormController, HallAddFormModel } from "./HallAddForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useAddHall, useUpdateHall } from "@infrastructure/apis/api-management/hall";
import { useCallback } from "react";
import { GenreEnum } from "@infrastructure/apis/client/models/GenreEnum";
import { SelectChangeEvent } from "@mui/material";
import { HallRecord } from "@infrastructure/apis/client/models/HallRecord";
import { HallEditFormModel } from "../Hall/HallEditForm.types";
import { HallEditFormController } from "./HallEditForm.types";


/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (movie: HallRecord | null, initialData?: HallEditFormModel) => {
    const defaultValues = {
        id: movie?.id || "",
        name: movie?.name || "",
        capacity: movie?.capacity || 0,
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
const useInitHallEditForm = (hall: HallRecord | null) => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues(hall);

    const schema = yup.object().shape({


        

        name: yup.string()
            .required("Title is required")
            .default(defaultValues.name),
        
        capacity: yup.number()
            .required("Capacity is required")
            .min(1, "Capacity must be at least 1")
            .default(defaultValues.capacity),
        
        
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useHallEditFormController = (hall: HallRecord | null, onSubmit?: () => void): HallEditFormController => {
    const { defaultValues, resolver } = useInitHallEditForm(hall);
    const { mutateAsync: add, status } = useUpdateHall();
    const queryClient = useQueryClient();
    const submit = useCallback((data: HallEditFormModel) => // Create a submit callback to send the form data to the backend.
            
            add(data).then(() => {
                {console.log(data.capacity)}
                if (onSubmit) {
                    onSubmit();
                }
            }), [add, queryClient]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<HallEditFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
    });

    const cancelOption = useCallback(() => {
            if (onSubmit) {
                onSubmit();
            }
        }, [queryClient]);

    

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
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