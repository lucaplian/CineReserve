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

public class FeedbackService(IRepository<WebAppDatabaseContext> repository): IFeedbackService
{
    public async Task<ServiceResponse<FeedbackRecord>> GetFeedback(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await repository.GetAsync(new FeedbackProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ? 
            ServiceResponse.ForSuccess(result) : 
            ServiceResponse.FromError<FeedbackRecord>(CommonErrors.FeedbackNotFound); // Pack the result or error into a ServiceResponse.
    }

    public async Task<ServiceResponse<PagedResponse<FeedbackRecord>>> GetFeedbacks(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await repository.PageAsync(pagination, new FeedbackProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse.ForSuccess(result);
    }
    
    public async Task<ServiceResponse> AddFeedback(FeedbackAddRecord feedback, Guid userId, CancellationToken cancellationToken = default)
    {
        

        if (feedback.Rating < 0 || feedback.Rating > 10)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Invalid rating!", ErrorCodes.CannotAdd));

        }

        
        await repository.AddAsync(new Feedback
        {
            Rating = feedback.Rating,
            Comment = feedback.Comment,
            WouldRecommend = feedback.WouldRecommend,
            UserId = userId,
            MovieId = feedback.MovieId
        }, cancellationToken); // A new entity is created and persisted in the database.
        
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateFeedback(FeedbackUpdateRecord feedback, Guid userId, CancellationToken cancellationToken = default)
    {
        

        var entity = await repository.GetAsync(new FeedbackSpec(feedback.Id), cancellationToken); 

        if (entity != null) // Verify if the movie is not found, you cannot update a non-existing entity.
        {
            entity.Rating = feedback.Rating ?? entity.Rating;
            entity.Comment = feedback.Comment ?? entity.Comment;
            entity.WouldRecommend = feedback.WouldRecommend ?? entity.WouldRecommend;
            entity.UserId = feedback.UserId ?? entity.UserId;
            entity.MovieId = feedback.MovieId ?? entity.MovieId;
            
            await repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteFeedback(Guid id, Guid userId, CancellationToken cancellationToken = default)
    {
        

        await repository.DeleteAsync<Feedback>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }

    
}