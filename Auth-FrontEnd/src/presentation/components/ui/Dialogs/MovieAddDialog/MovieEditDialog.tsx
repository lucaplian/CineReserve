import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useMovieAddDialogController } from "./MovieAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { MovieEditForm } from "@presentation/components/forms/Movie/MovieEditForm";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client";
import { MovieRecord } from "@infrastructure/apis/client/models/";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const MovieEditDialog = (props: { movie: MovieRecord | null ,  onClose: () => void }) => {

  return <div>
    
    <Dialog
      open = {true}
    >
      <DialogContent>
        <DialogTitle>
              Edit Movie
        </DialogTitle>
        <MovieEditForm movie={props.movie} onSubmit={props.onClose} />
      </DialogContent>
    </Dialog>
  </div>
};