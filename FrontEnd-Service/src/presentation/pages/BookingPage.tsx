import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { BookingsTable } from "@presentation/components/ui/Tables/BookingsTable";

export const BookingsPage = memo(() => {
  return <Fragment>
    <Seo title="CineReserve | Bookings" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <BookingsTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
