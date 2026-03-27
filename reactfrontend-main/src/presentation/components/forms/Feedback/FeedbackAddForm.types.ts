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

export type FeedbackAddFormModel = {
    rating: number;
    comment: string;
    wouldRecommend: boolean;
    movieId: string;
};

export type FeedbackAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<FeedbackAddFormModel>>;
};

export type FeedbackAddFormActions = {
    register: UseFormRegister<FeedbackAddFormModel>;
    watch: UseFormWatch<FeedbackAddFormModel>;
    handleSubmit: UseFormHandleSubmit<FeedbackAddFormModel>;
    submit: (body: FeedbackAddFormModel) => void;
    selectRating: (value: SelectChangeEvent<number>) => void;
    cancelOption: () => void;
    selectMovie: (value: SelectChangeEvent<string>) => void;
};
export type FeedbackAddFormComputed = {
    defaultValues: FeedbackAddFormModel,
    isSubmitting: boolean
};

export type FeedbackAddFormController = FormController<FeedbackAddFormState, FeedbackAddFormActions, FeedbackAddFormComputed>;