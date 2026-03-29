using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Abstractions;

public interface IBookingService
{
    public Task<ServiceResponse<BookingRecord>> GetBooking(Guid id, Guid UserId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<BookingRecord>>> GetBookings(PaginationSearchQueryParams pagination, Guid UserId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddBooking(BookingAddRecord booking, Guid UserId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateBooking(BookingUpdateRecord booking, Guid UserId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteBooking(Guid id, Guid UserId, CancellationToken cancellationToken = default);

}