using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Abstractions;

public interface IHallService
{
    public Task<ServiceResponse<HallRecord>> GetHall(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<HallRecord>>> GetHalls(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddHall(HallAddRecord hall, Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateHall(HallUpdateRecord hall, Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteHall(Guid id, Guid userId, CancellationToken cancellationToken = default);

}