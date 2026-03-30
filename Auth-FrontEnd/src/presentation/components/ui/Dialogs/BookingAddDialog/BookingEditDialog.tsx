import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useBookingAddDialogController } from "./BookingAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { BookingAddForm } from "@presentation/components/forms/Booking/BookingAddForm";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client";
import { BookingRecord } from "@infrastructure/apis/client/models/";
import { BookingEditForm } from "@presentation/components/forms/Booking/BookingEditForm";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const BookingEditDialog = (props: { booking: BookingRecord | null ,  onClose: () => void }) => {
  const { open, close, isOpen } = useBookingAddDialogController();
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <div>
    
    <Dialog
      open = {true}
    >
      <DialogContent>
        <DialogTitle>
          Edit Booking
        </DialogTitle>
        <BookingEditForm booking={props.booking} onSubmit={props.onClose} />
      </DialogContent>
    </Dialog>
  </div>
};