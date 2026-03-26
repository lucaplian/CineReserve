using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Abstractions;

public interface IScreeningService
{
    public Task<ServiceResponse<ScreeningRecord>> GetScreening(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<ScreeningRecord>>> GetScreenings(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddScreening(ScreeningAddRecord screening, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateScreening(ScreeningUpdateRecord screening, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteScreening(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
}