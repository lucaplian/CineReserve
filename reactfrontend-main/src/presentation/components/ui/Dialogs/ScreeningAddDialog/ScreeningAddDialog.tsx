import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useScreeningAddDialogController } from "./ScreeningAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { ScreeningAddForm } from "@presentation/components/forms/Screening/ScreeningAddForm";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const ScreeningAddDialog = () => {
  const { open, close, isOpen } = useScreeningAddDialogController();
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <div>
    {isAdmin && (
      <Button variant="outlined" onClick={open}>
        Add Screening
      </Button>
    )}
    <Dialog
      open={isOpen}
      onClose={close}>
      {isAdmin && (<DialogTitle>
        Add Screening
      </DialogTitle>)}
      <DialogContent>
        <ScreeningAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};