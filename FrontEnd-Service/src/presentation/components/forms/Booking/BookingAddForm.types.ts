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

export type BookingAddFormModel = {
    screeningId: string;
};

export type BookingAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<BookingAddFormModel>>;
};

export type BookingAddFormActions = {
    register: UseFormRegister<BookingAddFormModel>;
    watch: UseFormWatch<BookingAddFormModel>;
    handleSubmit: UseFormHandleSubmit<BookingAddFormModel>;
    submit: (body: BookingAddFormModel) => void;
    cancelOption: () => void;
};
export type BookingAddFormComputed = {
    defaultValues: BookingAddFormModel,
    isSubmitting: boolean
};

export type BookingAddFormController = FormController<BookingAddFormState, BookingAddFormActions, BookingAddFormComputed>;