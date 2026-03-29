using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Database.Repository.Entities;
using MobyLabWebProgramming.Services.DataTransferObjects;
namespace MobyLabWebProgramming.Services.Specifications;

public class BookingProjectionSpec: Specification<Booking, BookingRecord>
{
    public BookingProjectionSpec(bool orderByCreatedAt = false) =>
        Query.OrderByDescending(x => x.CreatedAt, orderByCreatedAt)
            .Select(e => new()
            {
                Id = e.Id,
                UserId = e.UserId,
                ScreeningId = e.ScreeningId,
                
                
            });

    public BookingProjectionSpec(Guid? userId, Guid id) : this()
    {
        Query.Where(e => e.UserId == userId);
        Query.Where(e => e.Id == id);
        // This constructor will call the first declared constructor with the default parameter. 
    }

    public BookingProjectionSpec(Guid id) : this() => Query.Where(e => e.Id == id); // This constructor will call the first declared constructor with the default parameter. 

    
    public BookingProjectionSpec(Guid? userId, string? search) : this(true) // This constructor will call the first declared constructor with 'true' as the parameter. 
    {
        
        Query.Where(e => e.UserId == userId);
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

         // This is an example on how database specific expressions can be used via C# expressions.
        // Note that this will be translated to the database something like "where user.Name ilike '%str%'".
    }
    public BookingProjectionSpec(string? search) : this(true) // This constructor will call the first declared constructor with 'true' as the parameter. 
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";
        
        // This is an example on how database specific expressions can be used via C# expressions.
        // Note that this will be translated to the database something like "where user.Name ilike '%str%'".
    }
}