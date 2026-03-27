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
import { useScreeningEditFormController } from "./ScreeningEditForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { ScreenEnum } from "@infrastructure/apis/client";
import { ScreeningRecord } from "@infrastructure/apis/client/models/";
import { usePaginationController } from "@presentation/components/ui/Tables/Pagination.controller";

import { useGetMovies } from "@infrastructure/apis/api-management/movie";
import { useGetHalls } from "@infrastructure/apis/api-management/hall";

/**
 * Here we declare the movie add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const ScreeningEditForm = (props: { screening: ScreeningRecord | null, onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useScreeningEditFormController(props.screening,props.onSubmit); // Use the controller.
    
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const { data, isError, isLoading, queryKey } = useGetMovies(page, 1000, "");
    const { data: hallsData, isError: isHallsError, isLoading: isHallsLoading, queryKey: hallsQueryKey } = useGetHalls(page, 1000, "");
    const movies = data?.response?.data || [];
    const halls = hallsData?.response?.data || [];
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
                            {...actions.register("startTime",  { valueAsDate: true })}
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
                    >
                    <FormLabel required>
                        <FormattedMessage id="globals.movieId" />
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

                <div className="col-span-1">
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.hallId)}
                    >
                    <FormLabel required>
                        <FormattedMessage id="globals.halls" />
                    </FormLabel>
                    <Select
                        {...actions.register("hallId")}
                        value={actions.watch("hallId")}
                        onChange={actions.selectHall} 
                        displayEmpty
                    >
                    <MenuItem value="" disabled>
                        <span className="text-gray">
                            {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                fieldName: formatMessage({ id: "globals.halls" }),
                            })}
                        </span>
                    </MenuItem>

                
                    
                        {halls.map(hall => (
                            <MenuItem key={hall.id} value={hall.id}>
                                {hall.name}
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