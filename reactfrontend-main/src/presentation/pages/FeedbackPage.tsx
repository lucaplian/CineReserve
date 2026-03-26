import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { FeedbacksTable } from "@presentation/components/ui/Tables/FeedbacksTable";

export const FeedbackPage = memo(() => {
  return <Fragment>
    <Seo title="CineReserve | Feedbacks" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <FeedbacksTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
