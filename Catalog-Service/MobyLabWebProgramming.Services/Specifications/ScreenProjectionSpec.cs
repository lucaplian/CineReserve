using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Database.Repository.Entities;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Specifications;

public class ScreeningProjectionSpec: Specification<Screening, ScreeningRecord>
{
    public ScreeningProjectionSpec(bool orderByCreatedAt = false) =>
        Query.OrderByDescending(x => x.CreatedAt, orderByCreatedAt)
            .Select(e => new()
            {
                Id = e.Id,
                StartTime = e.StartTime,
                MovieId = e.MovieId,
                Movie = new() { Id = e.Movie.Id, Title = e.Movie.Title, Duration = e.Movie.Duration, Genre = e.Movie.Genre, Description = e.Movie.Description },
                HallId = e.HallId,
                Hall = new() { Id = e.Hall.Id, Name = e.Hall.Name, Capacity = e.Hall.Capacity },
                ScreenType = e.ScreenType
            });

    public ScreeningProjectionSpec(Guid id) : this() => Query.Where(e => e.Id == id); // This constructor will call the first declared constructor with the default parameter. 

    public ScreeningProjectionSpec(string? search) : this(true) // This constructor will call the first declared constructor with 'true' as the parameter. 
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Movie.Title, searchExpr)
        || EF.Functions.ILike(e.Hall.Name, searchExpr)); // This is an example on how database specific expressions can be used via C# expressions.
        // Note that this will be translated to the database something like "where user.Name ilike '%str%'".
    }

    
}