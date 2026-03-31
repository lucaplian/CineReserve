import { UserRoleEnum } from "@infrastructure/apis/client/models/UserRoleEnum";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { MoviesPage } from "@presentation/pages/MoviePage";
import { HallsPage } from "@presentation/pages/HallPage";
import { ScreeningsPage } from "@presentation/pages/ScreeningPage";
import { BookingsPage } from "@presentation/pages/BookingPage";
import { FeedbackPage } from "@presentation/pages/FeedbackPage";
import { RegisterPage } from "@presentation/pages/RegisterPage";


import { BookingsTable } from "@presentation/components/ui/Tables/BookingsTable";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Movie} element={<MoviesPage />} />
        <Route path={AppRoute.Halls} element={<HallsPage />} />
        <Route path={AppRoute.Screenings} element={<ScreeningsPage />} />
        <Route path={AppRoute.Bookings} element={<BookingsPage />} />
        <Route path={AppRoute.Feedback} element={<FeedbackPage/>} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />}
      </Routes>
    </AppIntlProvider>
}
