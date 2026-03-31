import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useFeedbackAddDialogController } from "./FeedbackAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { FeedbackAddForm } from "@presentation/components/forms/Feedback/FeedbackAddForm";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client/models/UserRoleEnum";
import { FeedbackEditForm } from "@presentation/components/forms/Feedback/FeedbackEditForm";
import { FeedbackRecord } from "@infrastructure/apis/client/models/";

/**
 * This component wraps the user add form into a modal dialog.
 */


export const FeedbackEditDialog = (props: { feedback: FeedbackRecord | null ,  onClose: () => void }) => {
  

  return <div>
    
    <Dialog
          open = {true}
        >
          <DialogContent>
            <DialogTitle>
              Edit Booking
            </DialogTitle>
            <FeedbackEditForm feedback={props.feedback} onSubmit={props.onClose} />
          </DialogContent>
        </Dialog>
  </div>
};