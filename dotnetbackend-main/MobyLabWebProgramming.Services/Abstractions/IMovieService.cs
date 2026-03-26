using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Abstractions;

public interface IMovieService
{
    public Task<ServiceResponse<MovieRecord>> GetMovie(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<MovieRecord>>> GetMovies(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddMovie(MovieAddRecord movie, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateMovie(MovieUpdateRecord movie, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteMovie(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);

}