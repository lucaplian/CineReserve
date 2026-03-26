using Ardalis.Specification;
using MobyLabWebProgramming.Database.Repository.Entities;
namespace MobyLabWebProgramming.Services.Specifications;

public class BookingSpec: Specification<Booking>
{
    public BookingSpec(Guid id) => Query.Where(e => e.Id == id);

}