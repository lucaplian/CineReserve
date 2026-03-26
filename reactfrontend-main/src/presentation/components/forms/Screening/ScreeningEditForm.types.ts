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

export type ScreeningEditFormModel = {
    id: string;
    startTime: Date;
    movieId: string;
    hallId: string;
    screenType: ScreenEnum;
};

export type ScreeningEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<ScreeningEditFormModel>>;
};

export type ScreeningEditFormActions = {
    register: UseFormRegister<ScreeningEditFormModel>;
    watch: UseFormWatch<ScreeningEditFormModel>;
    handleSubmit: UseFormHandleSubmit<ScreeningEditFormModel>;
    submit: (body: ScreeningEditFormModel) => void;
    radioScreenType: (event: React.ChangeEvent<HTMLInputElement>) => void;
    cancelOption: () => void;
};
export type ScreeningEditFormComputed = {
    defaultValues: ScreeningEditFormModel,
    isSubmitting: boolean
};

export type ScreeningEditFormController = FormController<ScreeningEditFormState, ScreeningEditFormActions, ScreeningEditFormComputed>;