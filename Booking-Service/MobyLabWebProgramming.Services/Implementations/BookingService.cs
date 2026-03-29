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
using MobyLabWebProgramming.Services.Client;
namespace MobyLabWebProgramming.Services.Implementations;

public class BookingService(IRepository<WebAppDatabaseContext> repository, AuthServiceClient authServiceClient, IMailService mailService) : IBookingService
{
    public async Task<ServiceResponse<BookingRecord>> GetBooking(Guid id, Guid UserId,  CancellationToken cancellationToken = default)
    {
        
        var user = await authServiceClient.GetUser(UserId);
        
        if (user != null && user.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError<BookingRecord>(CommonErrors.BookingNotAuthorized);
        }
        
        
        
        var result = user?.Role != UserRoleEnum.Admin ? await repository.GetAsync(new BookingProjectionSpec(user?.Id, id), cancellationToken) 
            : await repository.GetAsync(new BookingProjectionSpec(id), cancellationToken); // Get a booking using a specification on the repository.
        
        
        return result != null ? 
            ServiceResponse.ForSuccess(result) : 
            ServiceResponse.FromError<BookingRecord>(CommonErrors.BookingNotFound); // Pack the result or error into a ServiceResponse.
    }

    public async Task<ServiceResponse<PagedResponse<BookingRecord>>> GetBookings(PaginationSearchQueryParams pagination, Guid UserId, CancellationToken cancellationToken = default)
    {
        var user = await authServiceClient.GetUser(UserId);

        if (user == null)
        {
            return ServiceResponse.FromError<PagedResponse<BookingRecord>>(CommonErrors.BookingNotAuthorized);
        }

        if (user?.Role != UserRoleEnum.Admin)
        {
            var result = await repository.PageAsync(pagination, new BookingProjectionSpec(user?.Id, pagination.Search),
                cancellationToken); // Use the specification and pagination API to get only some entities from the database.
            return ServiceResponse.ForSuccess(result);
        }
        var allResult = await repository.PageAsync(pagination, new BookingProjectionSpec(pagination.Search),
            cancellationToken);
        return ServiceResponse.ForSuccess(allResult);
    }

    public async Task<ServiceResponse> AddBooking(BookingAddRecord booking, Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await authServiceClient.GetUser(userId);

        if (user == null) // Verify if the user is logged in.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Unauthorized, "You must be logged in to make a booking!", ErrorCodes.CannotAdd));
        }

        await repository.AddAsync(new Booking
        {
            UserId = user!.Id,
            ScreeningId = booking.ScreeningId
        }, cancellationToken); // A new entity is created and persisted in the database.
        if (user?.Email != null)
        {
            await mailService.SendMail(user.Email, "Booking Confirmation - CineReserve",
                $"Your booking has been confirmed! Enjoy the movie!",
                false, "CineReserve", cancellationToken); // Send a confirmation email to the user.
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateBooking(BookingUpdateRecord booking, Guid userId, CancellationToken cancellationToken = default)
    {
        
        var user = await authServiceClient.GetUser(userId);    
        if (user == null) // Verify who can update the booking.
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

    public async Task<ServiceResponse> DeleteBooking(Guid id, Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await authServiceClient.GetUser(userId);
        Console.WriteLine(user);
        if (user != null)
        {
            Console.WriteLine(user.Role != UserRoleEnum.Admin);
            Console.WriteLine(user.Id);
            Console.WriteLine(id);
        }

        if (user == null) // Verify who can delete the movie.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can delete the booking!", ErrorCodes.CannotDelete));
        }

        await repository.DeleteAsync<Booking>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }
}