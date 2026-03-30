import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useBookingAddDialogController } from "./BookingAddDialog.controller";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

import { BookingAddForm } from "@presentation/components/forms/Booking/BookingAddForm";
import { useIntl } from "react-intl";
import {UserRoleEnum} from "@infrastructure/apis/client";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const BookingAddDialog = () => {
  const { open, close, isOpen } = useBookingAddDialogController();
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <div>
    
    <Button variant="outlined" onClick={open}>
      Add Booking
    </Button>
    
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        Add Booking
      </DialogTitle>
      <DialogContent>
        <BookingAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};