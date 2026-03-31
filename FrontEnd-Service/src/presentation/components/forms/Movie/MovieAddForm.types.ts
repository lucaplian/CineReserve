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

export type MovieAddFormModel = {
    title: string;
    description: string;
    duration: number;
    genre: GenreEnum;
};

export type MovieAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<MovieAddFormModel>>;
};

export type MovieAddFormActions = {
    register: UseFormRegister<MovieAddFormModel>;
    watch: UseFormWatch<MovieAddFormModel>;
    handleSubmit: UseFormHandleSubmit<MovieAddFormModel>;
    submit: (body: MovieAddFormModel) => void;
    selectGenre: (value: SelectChangeEvent<GenreEnum>) => void;
    cancelOption: () => void;
};
export type MovieAddFormComputed = {
    defaultValues: MovieAddFormModel,
    isSubmitting: boolean
};

export type MovieAddFormController = FormController<MovieAddFormState, MovieAddFormActions, MovieAddFormComputed>;