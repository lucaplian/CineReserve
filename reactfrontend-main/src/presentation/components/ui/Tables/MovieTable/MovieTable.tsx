import {useIntl} from "react-intl";
import {isUndefined} from "lodash";
import {IconButton, TablePagination, TextField} from "@mui/material";
import {DataLoadingContainer} from "../../LoadingDisplay";
import {useMovieTableController} from "./MovieTable.controller";
import {MovieRecord} from "@infrastructure/apis/client";
import DeleteIcon from '@mui/icons-material/Delete';
import {MovieAddDialog} from "/Users/madalinamarcu/Downloads/reactfrontend-main/src/presentation/components/ui/Dialogs/MovieAddDialog";
import {UserRoleEnum} from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import EditIcon from '@mui/icons-material/Edit';
import {useAppSelector} from "@application/store";
import {DataTable} from "@presentation/components/ui/Tables/DataTable";
import { useState } from "react";
import { AlignHorizontalCenter } from "@mui/icons-material";
import Popup from 'reactjs-popup';
import {useMovieAddDialogController} from "../../Dialogs/MovieAddDialog/MovieAddDialog.controller";
import { MovieAddForm } from "@presentation/components/forms/Movie/MovieAddForm";
import { MovieEditDialog } from "@presentation/components/ui/Dialogs/MovieAddDialog/MovieEditDialog";

import "/Users/madalinamarcu/Downloads/reactfrontend-main/src/index.css";
/**
 * 
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof MovieRecord, name: string, order: number }[] => {
    const {formatMessage} = useIntl();
    

    return [
        {key: "title", name: formatMessage({id: "globals.title"}), order: 1},
        {key: "description", name: formatMessage({id: "globals.description"}), order: 2},
        {key: "duration", name: formatMessage({id: "globals.duration"}), order: 3},
    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: MovieRecord[] | null | undefined, orderMap: { [key: string]: number }) =>
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

export const MovieTable = () => {
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const [query, setQuery] = useState('');
    const {formatMessage} = useIntl();
    const { open, close, isOpen } = useMovieAddDialogController();
    const [editMovie, setEditMovie] = useState<MovieRecord | null>(null);
    const header = useHeader();

    const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
    const [movieIdToDelete, setMovieIdToDelete] = useState('');
    const {handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, update, remove} = useMovieTableController(query); // Use the controller hook.


    function handleEditMovie(movie: MovieRecord) {
        setEditMovie(movie);
       
    }


    function handleDeleteUser(id: string) {
        setMovieIdToDelete(id);
        setOpenDeleteModal(true);
        //const profile = useAppSelector(x => x.profileReducer);
        //console.log("FeedbacksTable rendered with query:", profile);

    }

    function handleConfirm() {
        if (movieIdToDelete) {
       remove(movieIdToDelete);
        setOpenDeleteModal(false);
        setMovieIdToDelete('');
        }
       //const profile = useAppSelector(x => x.profileReducer);
        //console.log("FeedbacksTable rendered with query:", profile);

    }

    function handleCancel() {
        setOpenDeleteModal(false);
        setMovieIdToDelete('');
    }

    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        <MovieAddDialog/> 

        {editMovie && (<MovieEditDialog movie={editMovie} onClose={() => setEditMovie(null)} />)} {/* Add the movie add dialog and pass the edit movie to it if it is set. */}
        <TextField
        label = {formatMessage({id: "globals.searchMovies"})}
         value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            style={{ marginBottom: "10px", width: "300px", marginLeft: "900px" }}/> 
        
            
        {/* Add the button to open the movie add modal. */}
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
            <p style={{ color: 'white' }}>{formatMessage({id: "globals.confirmDeleteMovie"})}</p>
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

                    {key: "genre", name: formatMessage({id: "globals.genre"}), render: (entry) => { 
                                                

                                                const genreTranslations = new Map([
                                                    ["Action", "globals.action"],
                                                    ["Comedy", "globals.comedy"],
                                                    ["Drama", "globals.drama"],
                                                    ["Horror", "globals.horror"],
                                                    ["SciFi", "globals.sciFi"],
                                                    ["Thriller", "globals.thriller"],
                                                    ["Animation", "globals.animation"],
                                                    ["Documentary", "globals.documentary"],
                                                    ["Fantasy", "globals.fantasy"],
                                                    ["Romance", "globals.romance"],
                                                    ["Adventure", "globals.adventure"]
                                                ]);


                                                return <>{formatMessage({ id: genreTranslations.get(entry.genre) })}</>;

    
                    }, order: 4},
                    
                    
                    {
                       key: "actions",
                       name: formatMessage({id: "labels.actions"}),
                       render: entry => <>
                            {!isOpenDeleteModal &&isAdmin && <IconButton color="primary" onClick={() => handleEditMovie(entry)}>
                                <EditIcon color="primary" fontSize="small"/>
                            </IconButton>}
                           {!isOpenDeleteModal && isAdmin && <IconButton color="error" onClick={() => handleDeleteUser(entry.id || '')}>
                               <DeleteIcon color="error" fontSize="small"/>
                           </IconButton>
                           }</>,
                       order: 5
                   }]}
        />
    </DataLoadingContainer>
}