import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useScreeningAddDialogController } from "./ScreeningAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { ScreeningAddForm } from "@presentation/components/forms/Screening/ScreeningAddForm";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client";
import { ScreeningRecord } from "@infrastructure/apis/client/models/";
import { ScreeningEditForm } from "@presentation/components/forms/Screening/ScreeningEditForm";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const ScreeningEditDialog = (props: { screening: ScreeningRecord | null, onClose: () => void }) => {
  const { open, close, isOpen } = useScreeningAddDialogController();
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <div>
    <Dialog
          open = {true}
        >
          <DialogContent>
            <DialogTitle>
              Edit Screening
            </DialogTitle>
            <ScreeningEditForm screening={props.screening} onSubmit={props.onClose} />
          </DialogContent>
        </Dialog>
    
  </div>
};