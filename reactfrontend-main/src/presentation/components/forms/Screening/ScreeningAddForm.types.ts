import { GenreEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import { ScreenEnum } from "@infrastructure/apis/client";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type ScreeningAddFormModel = {
    startTime: Date;
    movieId: string;
    hallId: string;
    screenType: ScreenEnum;
};

export type ScreeningAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<ScreeningAddFormModel>>;
};

export type ScreeningAddFormActions = {
    register: UseFormRegister<ScreeningAddFormModel>;
    watch: UseFormWatch<ScreeningAddFormModel>;
    handleSubmit: UseFormHandleSubmit<ScreeningAddFormModel>;
    submit: (body: ScreeningAddFormModel) => void;
    radioScreenType: (event: React.ChangeEvent<HTMLInputElement>) => void;
    cancelOption: () => void;
};
export type ScreeningAddFormComputed = {
    defaultValues: ScreeningAddFormModel,
    isSubmitting: boolean
};

export type ScreeningAddFormController = FormController<ScreeningAddFormState, ScreeningAddFormActions, ScreeningAddFormComputed>;