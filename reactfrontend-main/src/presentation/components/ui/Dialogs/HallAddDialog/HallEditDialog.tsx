import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useHallAddDialogController } from "./HallAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { HallEditForm } from "@presentation/components/forms/Hall/HallEditForm";
import { HallRecord } from "@infrastructure/apis/client/models/";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const HallEditDialog = (props: { hall: HallRecord | null ,  onClose: () => void }) => {

  return <div>
    <Dialog
          open = {true}
        >
          <DialogContent>
            <DialogTitle>
              Edit Hall
            </DialogTitle>
            <HallEditForm hall={props.hall} onSubmit={props.onClose} />
          </DialogContent>
        </Dialog>
  </div>
};