import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Stack,
    OutlinedInput
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useRegisterFormController } from "./RegisterForm.controller";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { isEmpty, isUndefined } from "lodash";

/**
 * Here we declare the login form component.
 */
export const LoginForm = () => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useRegisterFormController(); // Use the controller.

    return <form className="min-w-[400px]" onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <ContentCard title={formatMessage({ id: "globals.login" })}>
                <div className="grid grid-cols-2 gap-y-5 gap-x-5">
                    <div className="col-span-2">
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
                                autoComplete="name"
                            /> {/* Add a input like a textbox shown here. */}
                            <FormHelperText
                                hidden={isUndefined(state.errors.name)}
                            >
                                {state.errors.name?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                    </div>
                    <div className="col-span-2">
                        <FormControl 
                            fullWidth
                            error={!isUndefined(state.errors.email)}
                        > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                            <FormLabel required>
                                <FormattedMessage id="globals.email" />
                            </FormLabel> {/* Add a form label to indicate what the input means. */}
                            <OutlinedInput
                                {...actions.register("email")} // Bind the form variable to the UI input.
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.email",
                                        }),
                                    })}
                                autoComplete="username"
                            /> {/* Add a input like a textbox shown here. */}
                            <FormHelperText
                                hidden={isUndefined(state.errors.email)}
                            >
                                {state.errors.email?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                    </div>
                    <div className="col-span-2">
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.password)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.password" />
                            </FormLabel>
                            <OutlinedInput
                                type="password"
                                {...actions.register("password")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.password",
                                        }),
                                    })}
                                autoComplete="current-password"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.password)}
                            >
                                {state.errors.password?.message}
                            </FormHelperText>
                        </FormControl>
                    </div>
                    <div className="flex -col-end-2 gap-48 col-span-2 ">

                    <Button  style={{ justifyContent: "right" }}  type="submit"disabled={!isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                        {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                        {computed.isSubmitting && <CircularProgress />}
                    </Button>
                    </div>

                    

                    
                </div>
            </ContentCard>
        </Stack>
    </form>
};