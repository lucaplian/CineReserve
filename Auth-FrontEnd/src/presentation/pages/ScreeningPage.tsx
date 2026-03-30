import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { ScreeningTable } from "@presentation/components/ui/Tables/ScreeningsTable";

export const ScreeningsPage = memo(() => {
  return <Fragment>
    <Seo title="CineReserve | Screenings" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <ScreeningTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
