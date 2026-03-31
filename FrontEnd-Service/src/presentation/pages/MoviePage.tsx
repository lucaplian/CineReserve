import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { MovieTable } from "@presentation/components/ui/Tables/MovieTable";

export const MoviesPage = memo(() => {
  return <Fragment>
    <Seo title="CineReserve | Movies" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <MovieTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
