import { GenreEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type HallEditFormModel = {
    id: string;
    name: string;
    capacity: number;
};

export type HallEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<HallEditFormModel>>;
};

export type HallEditFormActions = {
    register: UseFormRegister<HallEditFormModel>;
    watch: UseFormWatch<HallEditFormModel>;
    handleSubmit: UseFormHandleSubmit<HallEditFormModel>;
    submit: (body: HallEditFormModel) => void;
    cancelOption: () => void;
};
export type HallEditFormComputed = {
    defaultValues: HallEditFormModel,
    isSubmitting: boolean
};

export type HallEditFormController = FormController<HallEditFormState, HallEditFormActions, HallEditFormComputed>;