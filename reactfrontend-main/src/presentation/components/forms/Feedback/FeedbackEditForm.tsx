import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Stack,
    OutlinedInput,
    Select,
    MenuItem
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useFeedbackEditFormController } from "./FeedbackEditForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { GenreEnum } from "@infrastructure/apis/client";
import { FeedbackRecord } from "@infrastructure/apis/client/models/";
import { useGetMovies } from "@infrastructure/apis/api-management/movie";
import { usePaginationController } from "../../ui/Tables/Pagination.controller";
/**
 * Here we declare the movie add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const FeedbackEditForm = (props: {feedback: FeedbackRecord | null, onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useFeedbackEditFormController(props.feedback, props.onSubmit); // Use the controller.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const { data, isError, isLoading, queryKey } = useGetMovies(page, 1000, "");
    const movies = data?.response?.data || [];
    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-5">
                
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.rating)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        
                        
                        <FormLabel required>
                            <FormattedMessage id="globals.rating" />
                        
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <Select
                            {...actions.register("rating")}
                            value={actions.watch("rating")}
                            onChange={actions.selectRating} // Selects may need a listener to for the variable change.
                            displayEmpty
                        >
                        <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.rating",
                                            }),
                                        })}

                    
                                </span>
                        </MenuItem>
                        <MenuItem value={1}>
                           1
                        </MenuItem>
                        <MenuItem value={2}>
                            2
                        </MenuItem>

                        <MenuItem value={3}>
                            3
                        </MenuItem>
                        <MenuItem value={4}>
                            4   
                        </MenuItem>
                        <MenuItem value={5}>
                            5
                        </MenuItem>
                        <MenuItem value={6}>
                            6
                        </MenuItem>
                        <MenuItem value={7}>
                            7
                        </MenuItem>
                        <MenuItem value={8}>
                            8
                        </MenuItem>
                        <MenuItem value={9}>
                            9
                        </MenuItem>
                        <MenuItem value={10}>
                            10
                        </MenuItem>
                        

                        </Select>
                        
                        
                        
                        
                        {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.rating)}
                        >
                            {state.errors.rating?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </div>


                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.rating)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.comment" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("comment")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.comment",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.comment)}
                        >
                            {state.errors.comment?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </div>

                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.rating)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.wouldRecommend" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            type="checkbox"
                            {...actions.register("wouldRecommend")} // Bind the form variable to the UI input.
                            style={{ width: "18px", height: "18px" }}
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.wouldRecommend)}
                        >
                            {state.errors.wouldRecommend?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </div>

                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.movieId)}
                    >
                    <FormLabel required>
                        <FormattedMessage id="globals.movies" />
                    </FormLabel>
                    <Select
                        {...actions.register("movieId")}
                        value={actions.watch("movieId")}
                        onChange={actions.selectMovie} 
                        displayEmpty
                    >
                    <MenuItem value="" disabled>
                        <span className="text-gray">
                            {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                fieldName: formatMessage({ id: "globals.movies" }),
                            })}
                        </span>
                    </MenuItem>

                
                    
                        {movies.map(movie => (
                            <MenuItem key={movie.id} value={movie.id}>
                                {movie.title}
                            </MenuItem>
                        ))}
                            
                        

                    </Select>
                    <FormHelperText
                        hidden={isUndefined(state.errors.movieId)}
                    >
                        {state.errors.movieId?.message}
                    </FormHelperText>
                </FormControl>
                </div> 
                
                
                <div className="flex -col-end- gap-32 col-span-2  ">
                <Button type="button" onClick={() =>actions.cancelOption()}  disabled={!isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                        {!computed.isSubmitting && <FormattedMessage id="globals.cancel"  />}
                        {computed.isSubmitting && <CircularProgress />}
                </Button>
                <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                    {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                    {computed.isSubmitting && <CircularProgress />}
                </Button>
                </div>
            </div>
        </Stack>
    </form>
};