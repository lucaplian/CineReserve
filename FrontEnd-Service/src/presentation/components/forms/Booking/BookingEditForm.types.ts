import { GenreEnum } from "@infrastructure/apis/client/models/GenreEnum";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type BookingEditFormModel = {
    id: string;
    screeningId: string;
};

export type BookingEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<BookingEditFormModel>>;
};

export type BookingEditFormActions = {
    register: UseFormRegister<BookingEditFormModel>;
    watch: UseFormWatch<BookingEditFormModel>;
    handleSubmit: UseFormHandleSubmit<BookingEditFormModel>;
    submit: (body: BookingEditFormModel) => void;
    cancelOption: () => void;
};
export type BookingEditFormComputed = {
    defaultValues: BookingEditFormModel,
    isSubmitting: boolean
};

export type BookingEditFormController = FormController<BookingEditFormState, BookingEditFormActions, BookingEditFormComputed>;