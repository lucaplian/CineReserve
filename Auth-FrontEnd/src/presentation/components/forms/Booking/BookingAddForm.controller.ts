import { BookingAddFormController, BookingAddFormModel } from "./BookingAddForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useAddBooking } from "@infrastructure/apis/api-management/booking";
import { useCallback } from "react";
import { GenreEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { ScreeningRecord } from "@infrastructure/apis/client/models";
import { toast } from "react-toastify";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: BookingAddFormModel) => {
    const defaultValues = {
        screeningId: "",
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};


const getDefaultValues2 = (screening: ScreeningRecord | null, initialData?: BookingAddFormModel) => {
    const defaultValues = {
        screeningId: screening?.id || "",
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
const useInitBookingAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
      
        
        screeningId: yup.string()
            .required("Screening is required")
            .default(defaultValues.screeningId),    
        
        
        
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}


const useInitBookingAddForm2 = (screening: ScreeningRecord | null) => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues2(screening);

    const schema = yup.object().shape({
      
        
        screeningId: yup.string()
            .required("Screening is required")
            .default(defaultValues.screeningId),    
        
        
        
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}
/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useBookingAddFormController = ( onSubmit?: () => void): BookingAddFormController => {
    const { defaultValues, resolver } = useInitBookingAddForm();
    const { mutateAsync: add, status } = useAddBooking();
    const queryClient = useQueryClient();
    const submit = useCallback((data: BookingAddFormModel) => // Create a submit callback to send the form data to the backend.
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
    } = useForm<BookingAddFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            cancelOption // Add the cancel option handle.
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


export const useBookingAddFormController2 = (screening: ScreeningRecord | null, onSubmit?: () => void): BookingAddFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitBookingAddForm2(screening);
    const { mutateAsync: add, status } = useAddBooking();
    const queryClient = useQueryClient();
    const submit = useCallback((data: BookingAddFormModel) => // Create a submit callback to send the form data to the backend.
        add(data).then(() => {
            toast(formatMessage({ id: "notifications.messages.bookingSuccess" }));
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
    } = useForm<BookingAddFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            cancelOption // Add the cancel option handle.
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