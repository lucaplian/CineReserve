using System.Net;
using MobyLabWebProgramming.Database.Repository;
using MobyLabWebProgramming.Database.Repository.Entities;
using MobyLabWebProgramming.Database.Repository.Enums;
using MobyLabWebProgramming.Infrastructure.Errors;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.Abstractions;
using MobyLabWebProgramming.Services.Client;
using MobyLabWebProgramming.Services.DataTransferObjects;
using MobyLabWebProgramming.Services.Specifications;

namespace MobyLabWebProgramming.Services.Implementations;

public class ScreeningService(IRepository<WebAppDatabaseContext> repository,  AuthServiceClient authServiceClient) : IScreeningService
{
    public async Task<ServiceResponse<ScreeningRecord>> GetScreening(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await repository.GetAsync(new ScreeningProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ?
            ServiceResponse.ForSuccess(result) :
            ServiceResponse.FromError<ScreeningRecord>(CommonErrors.ScreeningNotFound); // Pack the result or error into a ServiceResponse.
    }

    public async Task<ServiceResponse<PagedResponse<ScreeningRecord>>> GetScreenings(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await repository.PageAsync(pagination, new ScreeningProjectionSpec(pagination.Search), cancellationToken);  // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddScreening(ScreeningAddRecord screening, Guid UserId, CancellationToken cancellationToken = default)
    {
        
        var user = await authServiceClient.GetUser(UserId);

        if (user != null && user.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add screenings!", ErrorCodes.CannotAdd));
        }

        await repository.AddAsync(new Screening
        {
            StartTime = screening.StartTime,
            MovieId = screening.MovieId,
            HallId = screening.HallId,
            ScreenType = screening.ScreenType
        }, cancellationToken); // A new entity is created and persisted in the database.

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateScreening(ScreeningUpdateRecord screening, Guid UserId, CancellationToken cancellationToken = default)
    {
        
        var user = await authServiceClient.GetUser(UserId);
        
        if (user != null && user.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update screenings!", ErrorCodes.CannotUpdate));
        }

        var entity = await repository.GetAsync(new ScreeningSpec(screening.Id), cancellationToken);

        if (entity != null) // Verify if the movie is not found, you cannot update a non-existing entity.
        {
            entity.StartTime = screening.StartTime ?? entity.StartTime;
            entity.MovieId = screening.MovieId ?? entity.MovieId;
            entity.HallId = screening.HallId ?? entity.HallId;
            entity.ScreenType = screening.ScreenType ?? entity.ScreenType;

            await repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess(); // Update the entity and persist the changes.
    }

    public async Task<ServiceResponse> DeleteScreening(Guid id, Guid UserId, CancellationToken cancellationToken = default)
    {
        
        var user = await authServiceClient.GetUser(UserId);

        if (user != null && user.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete screenings!", ErrorCodes.CannotDelete));
        }

        await repository.DeleteAsync<Screening>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }
}