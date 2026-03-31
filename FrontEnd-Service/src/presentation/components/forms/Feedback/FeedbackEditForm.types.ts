import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type FeedbackEditFormModel = {
    id: string;
    rating: number;
    comment: string;
    wouldRecommend: boolean;
    movieId: string;
};

export type FeedbackEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<FeedbackEditFormModel>>;
};

export type FeedbackEditFormActions = {
    register: UseFormRegister<FeedbackEditFormModel>;
    watch: UseFormWatch<FeedbackEditFormModel>;
    handleSubmit: UseFormHandleSubmit<FeedbackEditFormModel>;
    submit: (body: FeedbackEditFormModel) => void;
    selectRating: (value: SelectChangeEvent<number>) => void;
    cancelOption: () => void;
    selectMovie: (value: SelectChangeEvent<string>) => void;
};
export type FeedbackEditFormComputed = {
    defaultValues: FeedbackEditFormModel,
    isSubmitting: boolean
};

export type FeedbackEditFormController = FormController<FeedbackEditFormState, FeedbackEditFormActions, FeedbackEditFormComputed>;