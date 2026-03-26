using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Abstractions;

public interface IFeedbackService
{
    public Task<ServiceResponse<FeedbackRecord>> GetFeedback(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<FeedbackRecord>>> GetFeedbacks(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddFeedback(FeedbackAddRecord feedback, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateFeedback(FeedbackUpdateRecord feedback, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteFeedback(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);

}