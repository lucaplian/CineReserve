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

public class HallService(IRepository<WebAppDatabaseContext> repository): IHallService
{
    public async Task<ServiceResponse<HallRecord>> GetHall(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await repository.GetAsync(new HallProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ? 
            ServiceResponse.ForSuccess(result) : 
            ServiceResponse.FromError<HallRecord>(CommonErrors.HallNotFound); // Pack the result or error into a ServiceResponse.
    }

    public async Task<ServiceResponse<PagedResponse<HallRecord>>> GetHalls(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await repository.PageAsync(pagination, new HallProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse.ForSuccess(result);
    }
    
    public async Task<ServiceResponse> AddHall(HallAddRecord hall, UserRecord? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add halls!", ErrorCodes.CannotAdd));
        }

        
        await repository.AddAsync(new Hall
        {
            Name = hall.Name,
            Capacity = hall.Capacity
        }, cancellationToken); // A new entity is created and persisted in the database.
        
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateHall(HallUpdateRecord hall, UserRecord? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) 
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the hall!", ErrorCodes.CannotUpdate));
        }

        var entity = await repository.GetAsync(new HallSpec(hall.Id), cancellationToken); 

        if (entity != null) // Verify if the movie is not found, you cannot update a non-existing entity.
        {
            entity.Name = hall.Name ?? entity.Name;
            entity.Capacity = hall.Capacity ?? entity.Capacity;
            
            await repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteHall(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete halls!", ErrorCodes.CannotDelete));
        }

        await repository.DeleteAsync<Hall>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }

    
}