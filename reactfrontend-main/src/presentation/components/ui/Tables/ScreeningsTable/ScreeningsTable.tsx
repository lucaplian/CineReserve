import {useIntl} from "react-intl";
import {isUndefined} from "lodash";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import {IconButton, TablePagination, TextField} from "@mui/material";
import {DataLoadingContainer} from "../../LoadingDisplay";
import {useScreeningsTableController} from "./ScreeningsTable.controller";
import {ScreeningRecord} from "@infrastructure/apis/client";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import {ScreeningAddDialog} from "/Users/madalinamarcu/Downloads/reactfrontend-main/src/presentation/components/ui/Dialogs/ScreeningAddDialog/ScreeningAddDialog";
import {BookingAddFormActions} from "@presentation/components/forms/Booking/BookingAddForm.types";
import {ScreeningEditDialog} from "/Users/madalinamarcu/Downloads/reactfrontend-main/src/presentation/components/ui/Dialogs/ScreeningAddDialog/ScreeningEditDialog";
import {BookingAddFormModel} from "@presentation/components/forms/Booking/BookingAddForm.types";
import {UserRoleEnum} from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import EditIcon from '@mui/icons-material/Edit';
import {useAppSelector} from "@application/store";
import { useEffect, useState } from "react";
import {DataTable} from "@presentation/components/ui/Tables/DataTable";
import "/Users/madalinamarcu/Downloads/reactfrontend-main/src/index.css";

import { useBookingAddFormController2 } from "../../../forms/Booking/BookingAddForm.controller";
/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof ScreeningRecord, name: string, order: number }[] => {
    const {formatMessage} = useIntl();

    return [
        {key: "startTime", name: "Start Time", order: 1},
    ]

};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: ScreeningRecord[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return {key, value} })
            }
        });

/**
 * Creates the movie table.
 */

export const ScreeningTable = () => {
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const [query, setQuery]  = useState('');

    const {formatMessage} = useIntl();

    const header = useHeader();
    const {handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, update, remove} = useScreeningsTableController(query); // Use the controller hook.
    const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);    
    const [screeningIdToDelete, setScreeningIdToDelete] = useState('');
    const [number, setNumber] = useState(0);
    
    const [editScreening, setEditScreening] = useState<ScreeningRecord | null>(null);
    const [bookScreening, setBookScreening] = useState<ScreeningRecord | null>(null);
    const {actions}=useBookingAddFormController2(bookScreening);
    const controller = new AbortController();
    const signal = controller.signal;

    

    function handleEditScreening(screening: ScreeningRecord) {
            setEditScreening(screening);
           
    }

    function handleBookScreening(screening: ScreeningRecord) {
        setBookScreening(screening);
        const dataToRegister:  BookingAddFormModel= {screeningId: screening.id}
        
        actions.submit(dataToRegister);

    }


    function handleNextScreening(actions: BookingAddFormActions, screening: ScreeningRecord ) {

        if (screening) {
            const dataToRegister:  BookingAddFormModel= {screeningId: screening.id}
            
            actions.submit(dataToRegister);
        }


    }
    function handleDeleteUser(id: string) {
        setScreeningIdToDelete(id);
            setOpenDeleteModal(true);
        }

        function handleConfirm() {
            if (screeningIdToDelete) {
            remove(screeningIdToDelete);
            setOpenDeleteModal(false);
            setScreeningIdToDelete('');
            }
        }

        function handleCancel() {
            setOpenDeleteModal(false);
            setScreeningIdToDelete('');


        }
    

   
    
    
    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        <ScreeningAddDialog/> {/* Add the button to open the movie add modal. */}
        {editScreening && (<ScreeningEditDialog screening={editScreening} onClose={() => setEditScreening(null)} justBooking={false} />)} {/* Add the screening edit dialog and pass the edit screening to it if it is set. */}
        
        
        
        
        <TextField

                label = {formatMessage({id: "globals.searchScreenings"})}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="small"
                style={{ marginBottom: "10px", width: "300px", marginLeft: "900px" }}
        />
        {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
            <TablePagination // Use the table pagination to add the navigation between the table pages.
                component="div"
                count={pagedData.totalCount} // Set the entry count returned from the backend.
                page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0} // Set the current page you are on.
                onPageChange={handleChangePage} // Set the callback to change the current page.
                rowsPerPage={pagedData.pageSize} // Set the current page size.
                onRowsPerPageChange={handleChangePageSize} // Set the callback to change the current page size. 
                labelRowsPerPage={formatMessage({id: "labels.itemsPerPage"})}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}

        
        {isOpenDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h1 style={{ color: 'white' }}>{formatMessage({id: "globals.areYouSure"})}</h1>
            <p style={{ color: 'white' }}>{formatMessage({id: "globals.confirmDeleteScreening"})}</p>
            <div className="modal-buttons">
              <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleConfirm}>{formatMessage({id: "labels.yes"})}</button>
              <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleCancel}>{formatMessage({id: "labels.no"})}</button>
            </div>
          </div>
        </div>
      )}
        <DataTable data={pagedData?.data ?? []}
                   header={header}
                   extraHeader={[
                    {
                        key: "movies",
                        name: formatMessage({id: "globals.movies"}),
                        render: (entry: ScreeningRecord) => <>{entry.movie?.title}</>,
                        order: 2
                    },
                    {
                        key: "halls",
                        name: formatMessage({id: "globals.halls"}),
                        render: (entry: ScreeningRecord) => <>{entry.hall?.name}</>,
                        order: 3
                    },
                    {key: "screenType", name: formatMessage({id: "globals.screenType"}), render: (entry) => { 
                                               
                                                const screenMap = new Map([
                                                    ["TWO_D", "2D"],
                                                    ["THREE_D", "3D"],
                                                    ["FOUR_D", "4D"],
                                                    ["FOUR_DX", "4DX"]
                                                ]);

                                                const typeId = screenMap.get(entry.screenType) ;

                                                return <>{typeId }</>;
    
    
                    }, order: 4},
                    
                    {
                       
                       key: "actions",
                       name: formatMessage({id: "labels.actions"}),
                       render: entry => <>
                            
                            {!isOpenDeleteModal &&isAdmin && <IconButton color="primary" onClick={() => handleEditScreening(entry)}>
                                <EditIcon color="primary" fontSize="small"/>
                            </IconButton>}
                           {!isOpenDeleteModal && isAdmin && <IconButton color="error" onClick={() => handleDeleteUser(entry.id || '')}>
                               <DeleteIcon color="error" fontSize="small"/>
                           </IconButton>}
                           {}

                           {!isOpenDeleteModal  && !isAdmin && <IconButton color="success" onClick={() => handleBookScreening(entry)}>
                               <CheckIcon color="success" fontSize="small"/>
                           </IconButton>}
                           
                           
                           </>,
                       order: 5
                   }]}
        />
    </DataLoadingContainer>
}