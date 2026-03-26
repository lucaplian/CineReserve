using System.Net;
using MobyLabWebProgramming.Database.Repository;
using MobyLabWebProgramming.Database.Repository.Entities;
using MobyLabWebProgramming.Database.Repository.Enums;
using MobyLabWebProgramming.Infrastructure.Errors;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.Abstractions;
using MobyLabWebProgramming.Services.Constants;
using MobyLabWebProgramming.Services.DataTransferObjects;
using MobyLabWebProgramming.Services.Specifications;

namespace MobyLabWebProgramming.Services.Implementations;

public class BookingService(IRepository<WebAppDatabaseContext> repository, IMailService mailService) : IBookingService
{
    public async Task<ServiceResponse<BookingRecord>> GetBooking(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError<BookingRecord>(CommonErrors.BookingNotAuthorized);
        }
        var result = requestingUser.Role != UserRoleEnum.Admin ? await repository.GetAsync(new BookingProjectionSpec(requestingUser.Id, id), cancellationToken) 
            : await repository.GetAsync(new BookingProjectionSpec(id), cancellationToken); // Get a booking using a specification on the repository.
        return result != null ? 
            ServiceResponse.ForSuccess(result) : 
            ServiceResponse.FromError<BookingRecord>(CommonErrors.BookingNotFound); // Pack the result or error into a ServiceResponse.
    }

    public async Task<ServiceResponse<PagedResponse<BookingRecord>>> GetBookings(PaginationSearchQueryParams pagination, UserRecord? requestingUser = null, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError<PagedResponse<BookingRecord>>(CommonErrors.BookingNotAuthorized);
        }

        if (requestingUser.Role != UserRoleEnum.Admin)
        {
            var result = await repository.PageAsync(pagination, new BookingProjectionSpec(requestingUser.Id, pagination.Search),
                cancellationToken); // Use the specification and pagination API to get only some entities from the database.
            return ServiceResponse.ForSuccess(result);
        }
        var allResult = await repository.PageAsync(pagination, new BookingProjectionSpec(pagination.Search),
            cancellationToken);
        return ServiceResponse.ForSuccess(allResult);
    }

    public async Task<ServiceResponse> AddBooking(BookingAddRecord booking, UserRecord? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null) // Verify if the user is logged in.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Unauthorized, "You must be logged in to make a booking!", ErrorCodes.CannotAdd));
        }

        await repository.AddAsync(new Booking
        {
            UserId = requestingUser!.Id,
            ScreeningId = booking.ScreeningId
        }, cancellationToken); // A new entity is created and persisted in the database.

        await mailService.SendMail(requestingUser.Email, "Booking Confirmation - CineReserve", 
            $"Your booking has been confirmed! Enjoy the movie!", 
            false, "CineReserve", cancellationToken); // Send a confirmation email to the user.

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateBooking(BookingUpdateRecord booking, UserRecord? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != booking.Id) // Verify who can update the booking.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can update the booking!", ErrorCodes.CannotUpdate));
        }

        var entity = await repository.GetAsync(new BookingSpec(booking.Id), cancellationToken);

        if (entity != null) // Verify if the movie is not found, you cannot update a non-existing entity.
        {
            entity.UserId = booking.UserId ?? entity.UserId;
            entity.ScreeningId = booking.ScreeningId ?? entity.ScreeningId;

            await repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteBooking(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != id) // Verify who can delete the movie.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can delete the booking!", ErrorCodes.CannotDelete));
        }

        await repository.DeleteAsync<Booking>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }
}