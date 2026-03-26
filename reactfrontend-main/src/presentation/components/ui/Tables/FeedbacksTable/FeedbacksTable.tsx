import {useIntl} from "react-intl";
import {isUndefined} from "lodash";
import {IconButton, TablePagination, TextField} from "@mui/material";
import {DataLoadingContainer} from "../../LoadingDisplay";
import {useFeedbacksTableController} from "./FeedbacksTable.controller";
import {FeedbackRecord} from "@infrastructure/apis/client";
import DeleteIcon from '@mui/icons-material/Delete';
import {FeedbackAddDialog} from "../../Dialogs/FeedbackAddDialog";
import {UserRoleEnum} from "@infrastructure/apis/client";
import { useOwnUserHasRole, useOwnUser } from "@infrastructure/hooks/useOwnUser";
import EditIcon from '@mui/icons-material/Edit';
import {useAppSelector} from "@application/store";
import {DataTable} from "@presentation/components/ui/Tables/DataTable";
import { useState } from "react";  
import { FeedbackEditDialog } from "../../Dialogs/FeedbackAddDialog/FeedbackEditDialog";

import "/Users/madalinamarcu/Downloads/reactfrontend-main/src/index.css";

/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof FeedbackRecord, name: string, order: number }[] => {
    const {formatMessage} = useIntl();

    return [
        {key: "rating", name: formatMessage({id: "globals.rating"}), order: 2},
        {key: "comment", name: formatMessage({id: "globals.comment"}), order: 3},
        
    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: FeedbackRecord[] | null | undefined, orderMap: { [key: string]: number }) =>
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

export const FeedbacksTable = () => {
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const isOwnUser = useOwnUser();
    
    const [query, setQuery] = useState('');
    const {formatMessage} = useIntl();
    const header = useHeader();
    const {handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, update, remove} = useFeedbacksTableController(query); // Use the controller hook.
    
    const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);    
    const [feedbackIdToDelete, setFeedbackIdToDelete] = useState('');


    const [editFeedback, setEditFeedback] = useState<FeedbackRecord | null>(null);
    
    function handleEditFeedback(feedback: FeedbackRecord) {
        setEditFeedback(feedback);
        
    }

    
    function handleDeleteUser(id: string) {
        setFeedbackIdToDelete(id);
        setOpenDeleteModal(true);
    }

    function handleConfirm() {
        if (feedbackIdToDelete) {
        remove(feedbackIdToDelete);
        setOpenDeleteModal(false);
        setFeedbackIdToDelete('');
        }
    }

    function handleCancel() {
        setOpenDeleteModal(false);
        setFeedbackIdToDelete('');
    }
    
    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        <FeedbackAddDialog/> {/* Add the button to open the movie add modal. */}
        {editFeedback && (<FeedbackEditDialog feedback={editFeedback} onClose={() => setEditFeedback(null)} />)} {/* Add the movie add dialog and pass the edit movie to it if it is set. */}
        
        <TextField
            label={formatMessage({id: "globals.searchFeedbacks"})}
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
            <p style={{ color: 'white' }}>{formatMessage({id: "globals.confirmDeleteFeedback"})}</p>
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
                        key: "user",
                        name: formatMessage({id: "globals.user"}),
                        render: (entry: FeedbackRecord) => <>{entry.user?.email}</>,
                        order: 0
                    },
                    {
                        key: "movies",
                        name: formatMessage({id: "globals.movies"}),
                        render: (entry: FeedbackRecord) => <>{entry.movie?.title}</>,
                        order: 1
                    },
                    {key: "wouldRecommend", name: formatMessage({id: "globals.wouldRecommend"}), render: (entry) => { 
                                                const wouldRecommendTranslations = new Map([
                                                    [true, "globals.true"],
                                                    [false, "globals.false"],
                                                    ]);

                                                return <>{formatMessage({ id: wouldRecommendTranslations.get(entry.wouldRecommend || false) })}</>;
                    }, order: 4},
                {
                       key: "actions",
                       name: formatMessage({id: "labels.actions"}),
                       render: entry => <>
                            {!isOpenDeleteModal && (isAdmin || isOwnUser?.id==entry.user?.id) &&   <IconButton color="primary" onClick={() => handleEditFeedback(entry)}>
                                <EditIcon color="primary" fontSize="small"/>
                            </IconButton>}
                           {!isOpenDeleteModal && (isAdmin || isOwnUser?.id==entry.user?.id)  && <IconButton color="error" onClick={() => handleDeleteUser(entry.id || '')}>
                               <DeleteIcon color="error" fontSize="small"/>
                           </IconButton>
                           }</>,
                       order: 5
                   }
                
                ]}
                header={header}
                  
        />

        
    </DataLoadingContainer>
}