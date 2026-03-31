import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "routes";

/**
 * The object returned can be used to navigate within the application on various routes, use the callbacks for automatic redirects.
 */
export const useAppRouter = () => {
  const navigate = useNavigate();

  const redirectToHome = useCallback(
    () => navigate(AppRoute.Index),
    [navigate]
  );

  const redirectToUsers = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Users
      }),
    [navigate]
  );

  const redirectToMovie = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Movie
      }),
    [navigate]
  );

  const redirectToHalls = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Halls
      }),
    [navigate]
  );

  const redirectToScreenings = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Screenings
      }),
    [navigate]
  );


  const redirectToBookings = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Bookings
      }),
    [navigate]
  );

  const redirectToFeedback = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Feedback
      }),
    [navigate]
  );



  

  const redirectToUsersFiles = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Users
      }),
    [navigate]
  );
  const redirectToRegister = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Register
      }),
    [navigate]
  );

  return {
    redirectToHome,
    redirectToUsers,
    redirectToUsersFiles,
    redirectToRegister,
    redirectToMovie,
    redirectToHalls,
    redirectToScreenings,
    redirectToBookings,
    redirectToFeedback,
    navigate
  };
};
