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

public class MovieService(IRepository<WebAppDatabaseContext> repository): IMovieService
{
    public async Task<ServiceResponse<MovieRecord>> GetMovie(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await repository.GetAsync(new MovieProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ? 
            ServiceResponse.ForSuccess(result) : 
            ServiceResponse.FromError<MovieRecord>(CommonErrors.MovieNotFound); // Pack the result or error into a ServiceResponse.
    }

    public async Task<ServiceResponse<PagedResponse<MovieRecord>>> GetMovies(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await repository.PageAsync(pagination, new MovieProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse.ForSuccess(result);
    }
    
    public async Task<ServiceResponse> AddMovie(MovieAddRecord movie, UserRecord? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add movies!", ErrorCodes.CannotAdd));
        }

        
        await repository.AddAsync(new Movie
        {
            Title = movie.Title,
            Description = movie.Description,
            Duration = movie.Duration,
            Genre = movie.Genre,
        }, cancellationToken); // A new entity is created and persisted in the database.
        
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateMovie(MovieUpdateRecord movie, UserRecord? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) 
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the movie!", ErrorCodes.CannotUpdate));
        }

        var entity = await repository.GetAsync(new MovieSpec(movie.Id), cancellationToken); 

        if (entity != null) // Verify if the movie is not found, you cannot update a non-existing entity.
        {
            entity.Title = movie.Title ?? entity.Title;
            entity.Description = movie.Description ?? entity.Description;
            entity.Duration = movie.Duration ?? entity.Duration;
            entity.Genre = movie.Genre ?? entity.Genre;

            await repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteMovie(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete movies!", ErrorCodes.CannotDelete));
        }

      
        await repository.DeleteAsync<Movie>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }

    
}