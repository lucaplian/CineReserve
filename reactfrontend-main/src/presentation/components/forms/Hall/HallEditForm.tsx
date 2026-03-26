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
import { useHallEditFormController } from "./HallEditForm.controller";
import { HallRecord } from "@infrastructure/apis/client/models/";
import { isEmpty, isUndefined } from "lodash";
import { GenreEnum } from "@infrastructure/apis/client";

/**
 * Here we declare the movie add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const HallEditForm = (props: { hall: HallRecord | null; onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useHallEditFormController(props.hall, props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <div className="grid grid-cols-2 gap-y-5 gap-x-5">

                <div className="col-span-1">
                    

                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.name)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.name" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("name")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.name",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.name)}
                        >
                            {state.errors.name?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </div>
                
                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.capacity)}
                    >
                        <FormLabel required>
                            <FormattedMessage id="globals.capacity" />
                        </FormLabel>
                        <OutlinedInput
                            type="number"
                            {...actions.register("capacity", { valueAsNumber: true })}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.capacity",
                                    }),
                                })}
                            autoComplete="none"
                        />
                        <FormHelperText
                            hidden={isUndefined(state.errors.capacity)}
                        >
                            {state.errors.capacity?.message}
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