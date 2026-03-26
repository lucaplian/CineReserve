import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useMovieAddDialogController } from "./MovieAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { MovieAddForm } from "@presentation/components/forms/Movie/MovieAddForm";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const MovieAddDialog = () => {
  const { open, close, isOpen } = useMovieAddDialogController();
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <div>
    {isAdmin && (
      <Button variant="outlined" onClick={open}>
        Add Movie
      </Button>
    )}
    <Dialog
      open={isOpen}
      onClose={close}>
      {isAdmin && (<DialogTitle>
        Add Movie
      </DialogTitle>)}
      <DialogContent>
        <MovieAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};