import {useIntl} from "react-intl";
import {isUndefined} from "lodash";
import {IconButton, TablePagination, TextField} from "@mui/material";
import {DataLoadingContainer} from "../../LoadingDisplay";
import {useHallTableController} from "./HallsTable.controller";
import {HallRecord} from "@infrastructure/apis/client/models/HallRecord";
import DeleteIcon from '@mui/icons-material/Delete';
import {HallAddDialog} from "../../Dialogs/HallAddDialog";
import {UserRoleEnum} from "@infrastructure/apis/client/models/UserRoleEnum";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import EditIcon from '@mui/icons-material/Edit';
import {useAppSelector} from "@application/store";
import {DataTable} from "@presentation/components/ui/Tables/DataTable";
import { HallEditDialog } from "../../Dialogs/HallAddDialog/HallEditDialog";
import { useState } from "react";
import "../../../../../index.css";

/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof HallRecord, name: string, order: number }[] => {
    const {formatMessage} = useIntl();

    return [
        {key: "name", name: formatMessage({id: "globals.name"}), order: 1},
        {key: "capacity", name: formatMessage({id: "globals.capacity"}), order: 2},
    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: HallRecord[] | null | undefined, orderMap: { [key: string]: number }) =>
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

export const HallTable = () => {
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

    const {formatMessage} = useIntl();
    const header2 = useHeader();
    const [query, setQuery] = useState('');
    const {handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, update, remove} = useHallTableController(query); // Use the controller hook.

    const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);    
    const [editHall, setEditHall] = useState<HallRecord | null>(null);
    const [hallIdToDelete, setHallIdToDelete] = useState('');

    function handleEditHall(hall: HallRecord) {
        setEditHall(hall);
       
    }
    
    
    function handleDeleteUser(id: string) {
        setHallIdToDelete(id);
        setOpenDeleteModal(true);
        console.log("FeedbacksTable rendered with query:", useAppSelector(x => x.profileReducer));
    }

    function handleConfirm() {
        if (hallIdToDelete) {
        remove(hallIdToDelete);
        setOpenDeleteModal(false);
        setHallIdToDelete('');
        }
        //console.log("FeedbacksTable rendered with query:", useAppSelector(x => x.profileReducer));

    }

    function handleCancel() {
        setOpenDeleteModal(false);
        setHallIdToDelete('');
    }
    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        <HallAddDialog/> {/* Add the button to open the movie add modal. */}
        {editHall && (<HallEditDialog hall={editHall} onClose={() => setEditHall(null)} />)} {/* Add the movie add dialog and pass the edit movie to it if it is set. */}
        
        
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
            <p style={{ color: 'white' }}>{formatMessage({id: "globals.confirmDeleteHall"})}</p>
            <div className="modal-buttons">
              <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleConfirm}>{formatMessage({id: "labels.yes"})}</button>
              <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleCancel}>{formatMessage({id: "labels.no"})}</button>
            </div>
          </div>
        </div>
      )}

        <DataTable data={pagedData?.data ?? []}
                   
                   extraHeader={[
                    
                    
                    
                    {
                       key: "actions",
                       name: formatMessage({id: "labels.actions"}),
                       render: (entry: HallRecord) => <>
                            {!isOpenDeleteModal &&isAdmin && <IconButton color="primary" onClick={() => handleEditHall(entry)}>
                                <EditIcon color="primary" fontSize="small"/>
                            </IconButton>}
                           {!isOpenDeleteModal && isAdmin && <IconButton color="error" onClick={() => handleDeleteUser(entry.id || '')}>
                               <DeleteIcon color="error" fontSize="small"/>
                           </IconButton>
                           }</>,
                       order: 3
                   }]}
                   header = {[{key: "name", name: formatMessage({id: "globals.name"}), order: 1},
                            {key: "capacity", name: formatMessage({id: "globals.capacity"}), order: 2}]}
        />
    </DataLoadingContainer>
}