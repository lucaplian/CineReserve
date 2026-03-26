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
import { useBookingEditFormController } from "./BookingEditForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { GenreEnum } from "@infrastructure/apis/client";
import { BookingRecord } from "@infrastructure/apis/client/models/";

/**
 * Here we declare the movie add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const BookingEditForm = (props: {booking: BookingRecord | null, onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useBookingEditFormController(props.booking, props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-5">
                
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.screeningId)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.id_screenings" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("screeningId")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.id_screenings",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.screeningId)}
                        >
                            {state.errors.screeningId?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
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