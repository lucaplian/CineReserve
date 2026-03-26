using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Abstractions;

public interface IBookingService
{
    public Task<ServiceResponse<BookingRecord>> GetBooking(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<BookingRecord>>> GetBookings(PaginationSearchQueryParams pagination, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddBooking(BookingAddRecord booking, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateBooking(BookingUpdateRecord booking, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteBooking(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default);

}