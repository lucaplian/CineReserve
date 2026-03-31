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

export type HallAddFormModel = {
    name: string;
    capacity: number;
};

export type HallAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<HallAddFormModel>>;
};

export type HallAddFormActions = {
    register: UseFormRegister<HallAddFormModel>;
    watch: UseFormWatch<HallAddFormModel>;
    handleSubmit: UseFormHandleSubmit<HallAddFormModel>;
    submit: (body: HallAddFormModel) => void;
    cancelOption: () => void;
};
export type HallAddFormComputed = {
    defaultValues: HallAddFormModel,
    isSubmitting: boolean
};

export type HallAddFormController = FormController<HallAddFormState, HallAddFormActions, HallAddFormComputed>;