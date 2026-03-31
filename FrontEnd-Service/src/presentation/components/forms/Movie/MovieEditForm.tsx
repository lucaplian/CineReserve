import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Stack,
    OutlinedInput,
    Select,
    MenuItem,
    RadioGroup,
    Radio,
    FormControlLabel
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useMovieEditFormController } from "./MovieEditForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { GenreEnum } from "@infrastructure/apis/client/models/GenreEnum";
import { MovieRecord } from "@infrastructure/apis/client/models/MovieRecord";

/**
 * Here we declare the movie add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const MovieEditForm = (props: { movie: MovieRecord | null, onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useMovieEditFormController(props.movie, props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <div className="grid grid-cols-2 gap-y-5 gap-x-5">
                
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.title)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.title" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("title")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.title",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.title)}
                        >
                            {state.errors.title?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </div>
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.description)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.description" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("description")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.description",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.description)}
                        >
                            {state.errors.description?.message}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.duration)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.duration" />
                        </FormLabel>
                        <OutlinedInput
                            type="number"
                            {...actions.register("duration")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.duration",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.duration)}
                        >
                            {state.errors.duration?.message}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.genre)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.genre" />
                        </FormLabel>
                        <Select
                            {...actions.register("genre")}
                            value={actions.watch("genre")}
                            onChange={actions.selectGenre} // Selects may need a listener to for the variable change.
                            displayEmpty
                        >
                            <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.genre",
                                            }),
                                        })}
                                    </span>
                            </MenuItem>
                            <MenuItem value={GenreEnum.Action}>
                                <FormattedMessage id="globals.action" />
                            </MenuItem>
                            <MenuItem value={GenreEnum.Adventure}>
                                <FormattedMessage id="globals.adventure" />
                            </MenuItem>

                            <MenuItem value={GenreEnum.Comedy}>
                                <FormattedMessage id="globals.comedy" />
                            </MenuItem>
                            <MenuItem value={GenreEnum.Drama}>
                                <FormattedMessage id="globals.drama" />
                            </MenuItem>
                            <MenuItem value={GenreEnum.Documentary}>
                                <FormattedMessage id="globals.documentary" />
                            </MenuItem>
                            <MenuItem value={GenreEnum.Fantasy}>
                                <FormattedMessage id="globals.fantasy" />
                            </MenuItem>
                            <MenuItem value={GenreEnum.Horror}>
                                <FormattedMessage id="globals.horror" />
                            </MenuItem>
                            <MenuItem value={GenreEnum.Romance}>
                                <FormattedMessage id="globals.romance" />
                            </MenuItem>
                            <MenuItem value={GenreEnum.SciFi}>
                                <FormattedMessage id="globals.sciFi" />
                            </MenuItem>
                            <MenuItem value={GenreEnum.Thriller}>
                                <FormattedMessage id="globals.thriller" />
                            </MenuItem>
                            <MenuItem value={GenreEnum.Animation}>
                                <FormattedMessage id="globals.animation" />
                            </MenuItem>

                        </Select>
                        <FormHelperText
                            hidden={isUndefined(state.errors.genre)}
                        >
                            {state.errors.genre?.message}
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