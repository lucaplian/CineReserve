import { ScreeningAddFormController, ScreeningAddFormModel } from "./ScreeningAddForm.types";
import { ScreeningEditFormController, ScreeningEditFormModel } from "./ScreeningEditForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useAddScreening } from "@infrastructure/apis/api-management/screening";
import { useCallback } from "react";
import { useUpdateScreening } from "@infrastructure/apis/api-management/screening";
import { SelectChangeEvent } from "@mui/material";
import { ScreenEnum } from "@infrastructure/apis/client/models/ScreenEnum";
import { FoodEnum } from "@infrastructure/apis/client/models/FoodEnum";
import { ScreeningRecord } from "@infrastructure/apis/client/models/ScreeningRecord";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (screening: ScreeningRecord | null, initialData?: ScreeningEditFormModel) => {
    const defaultValues = {
        id: screening?.id || "",
        startTime: screening?.startTime ? new Date(screening.startTime) : new Date(),
        movieId: screening?.movieId || "",
        hallId: screening?.hallId || "",
        screenType: screening?.screenType || ScreenEnum.TwoD
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
const useInitScreeningEditForm = (screening: ScreeningRecord | null) => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues(screening);

    const schema = yup.object().shape({
      
        
        startTime: yup.date()
            .required("Start time is required")
            .default(defaultValues.startTime),
        
        movieId: yup.string()
            .required("Movie is required")
            .default(defaultValues.movieId),
        
        hallId: yup.string()
            .required("Hall is required")
            .default(defaultValues.hallId),
        screenType: yup.string()
                        .oneOf([ 
                        ScreenEnum.TwoD,
                        ScreenEnum.ThreeD,
                        ScreenEnum.FourD,
                        ScreenEnum.FourDx
                    ])
                    .required("Screen type is required")
                    .default(defaultValues.screenType),
        
        
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useScreeningEditFormController = (screening: ScreeningRecord | null, onSubmit?: () => void): ScreeningEditFormController => {
    const { defaultValues, resolver } = useInitScreeningEditForm(screening);
    const { mutateAsync: add, status } = useUpdateScreening();
    const queryClient = useQueryClient();
    const submit = useCallback((data: ScreeningEditFormModel) => // Create a submit callback to send the form data to the backend.
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
    } = useForm<ScreeningEditFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
    });

    const radioScreenType = useCallback((event: React.ChangeEvent<HTMLInputElement>) => { // Select inputs are tricky and may need their on callbacks to set the values.
            setValue("screenType", event.target.value as ScreenEnum, {
                shouldValidate: true,
            });
        }, [setValue]);
    const selectMovie = useCallback((event: SelectChangeEvent<string>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("movieId", event.target.value as string, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectHall = useCallback((event: SelectChangeEvent<string>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("hallId", event.target.value as string, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            radioScreenType,
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            cancelOption,
            selectMovie,
            selectHall
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