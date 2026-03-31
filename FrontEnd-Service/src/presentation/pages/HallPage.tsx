import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { HallTable } from "@presentation/components/ui/Tables/HallsTable";

export const HallsPage = memo(() => {
  return <Fragment>
    <Seo title="CineReserve | Halls" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <HallTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
