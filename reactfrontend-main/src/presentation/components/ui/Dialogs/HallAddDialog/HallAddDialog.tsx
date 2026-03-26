import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useHallAddDialogController } from "./HallAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { HallAddForm } from "@presentation/components/forms/Hall/HallAddForm";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const HallAddDialog = () => {
  const { open, close, isOpen } = useHallAddDialogController();
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <div>
    {isAdmin && (
      <Button variant="outlined" onClick={open}>
        Add Hall
      </Button>
    )}
    <Dialog
      open={isOpen}
      onClose={close}>
      {isAdmin && (<DialogTitle>
        Add Hall
      </DialogTitle>)}
      <DialogContent>
        <HallAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};