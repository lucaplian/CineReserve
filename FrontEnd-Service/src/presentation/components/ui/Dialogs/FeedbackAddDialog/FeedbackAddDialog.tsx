import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useFeedbackAddDialogController } from "./FeedbackAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { FeedbackAddForm } from "@presentation/components/forms/Feedback/FeedbackAddForm";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client/models/UserRoleEnum";

/**
 * This component wraps the user add form into a modal dialog.
 */


export const FeedbackAddDialog = () => {
  const { open, close, isOpen } = useFeedbackAddDialogController();
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <div>
    
    <Button variant="outlined" onClick={open}>
      Add Feedback
    </Button>
    
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        Add Feedback
      </DialogTitle>
      <DialogContent>
        <FeedbackAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};