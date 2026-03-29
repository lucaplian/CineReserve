using System.Net;

namespace MobyLabWebProgramming.Infrastructure.Errors;

/// <summary>
/// Common error messages that may be reused in various places in the code.
/// </summary>
public static class CommonErrors
{
    public static ErrorMessage MovieNotFound => new(HttpStatusCode.NotFound, "Movie doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage BookingNotAuthorized => new(HttpStatusCode.Unauthorized, "Booking is not authorized!", ErrorCodes.EntityNotFound);
    public static ErrorMessage HallNotFound => new(HttpStatusCode.NotFound, "Hall doesn't exist!", ErrorCodes.EntityNotFound);

    public static ErrorMessage FeedbackNotFound => new(HttpStatusCode.NotFound, "Feedback doesn't exist!", ErrorCodes.EntityNotFound);

    public static ErrorMessage ScreeningNotFound => new(HttpStatusCode.NotFound, "Screening doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage BookingNotFound => new(HttpStatusCode.NotFound, "Booking doesn't exist!", ErrorCodes.EntityNotFound);

    public static ErrorMessage UserNotFound => new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage FileNotFound => new(HttpStatusCode.NotFound, "File not found on disk!", ErrorCodes.PhysicalFileNotFound);
    public static ErrorMessage TechnicalSupport => new(HttpStatusCode.InternalServerError, "An unknown error occurred, contact the technical support!", ErrorCodes.TechnicalError);
}
