using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Abstractions;

public interface IScreeningService
{
    public Task<ServiceResponse<ScreeningRecord>> GetScreening(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<ScreeningRecord>>> GetScreenings(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddScreening(ScreeningAddRecord screening, Guid UserId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateScreening(ScreeningUpdateRecord screening, Guid UserId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteScreening(Guid id, Guid UserId, CancellationToken cancellationToken = default);
}