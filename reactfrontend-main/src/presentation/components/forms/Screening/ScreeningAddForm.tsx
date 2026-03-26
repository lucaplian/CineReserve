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
import { useScreeningAddFormController } from "./ScreeningAddForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { ScreenEnum } from "@infrastructure/apis/client";

/**
 * Here we declare the movie add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const ScreeningAddForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useScreeningAddFormController(props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-5">
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.startTime)}
                    >
                        <FormLabel required>
                            Start Time
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("startTime")}
                            type="datetime-local"
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.startTime)}
                        >
                            {state.errors.startTime?.message}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.movieId)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.id_movies" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("movieId")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.id_movies",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.movieId)}
                        >
                            {state.errors.movieId?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </div>
                
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.hallId)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.id_halls" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("hallId")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.id_halls",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.hallId)}
                        >
                            {state.errors.hallId?.message}
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
            <div className="col-span-1">
                <FormControl
                    fullWidth
                    error={!isUndefined(state.errors.screenType)}
                >
                    <FormLabel required>
                        <FormattedMessage id="globals.screenType" />
                    </FormLabel>
                </FormControl>

                <RadioGroup
                    {...actions.register("screenType")}
                    name = "screenType"
                    
                    defaultValue={ScreenEnum.TwoD}
                    value={actions.watch("screenType") || ScreenEnum.TwoD}
                    onChange={actions.radioScreenType} 
                    
                >
                <FormControlLabel
                value={ScreenEnum.TwoD}
                control={<Radio />}
                label={<FormattedMessage id="globals.twoD" />}
                />
                <FormControlLabel
                value={ScreenEnum.ThreeD}
                control={<Radio />}
                label={<FormattedMessage id="globals.threeD" />}
                />
                <FormControlLabel
                value={ScreenEnum.FourD}
                control={<Radio />}
                label={<FormattedMessage id="globals.fourD" />}
                />
                <FormControlLabel
                value={ScreenEnum.FourDx}
                control={<Radio />}
                label={<FormattedMessage id="globals.fourDx" />}
                />
                </RadioGroup>
        </div>
                
        </Stack>
    </form>
};