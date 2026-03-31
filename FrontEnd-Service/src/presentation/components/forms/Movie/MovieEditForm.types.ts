import { GenreEnum } from "@infrastructure/apis/client/models/GenreEnum";
import { FormController } from "../FormController";
import { UseFormHandleSubmit, UseFormRegister, FieldErrorsImpl, DeepRequired, UseFormWatch } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type MovieEditFormModel = {
    id: string;
    title: string;
    description: string;
    duration: number;
    genre: GenreEnum;
};

export type MovieEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<MovieEditFormModel>>;
};

export type MovieEditFormActions = {
    register: UseFormRegister<MovieEditFormModel>;
    watch: UseFormWatch<MovieEditFormModel>;
    handleSubmit: UseFormHandleSubmit<MovieEditFormModel>;
    submit: (body: MovieEditFormModel) => void;
    selectGenre: (value: SelectChangeEvent<GenreEnum>) => void;
    cancelOption: () => void;
};

export type MovieEditFormComputed = {
    defaultValues: MovieEditFormModel,
    isSubmitting: boolean
};

export type MovieEditFormController = FormController<MovieEditFormState, MovieEditFormActions, MovieEditFormComputed>;