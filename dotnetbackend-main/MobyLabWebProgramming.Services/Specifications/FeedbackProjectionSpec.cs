using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Database.Repository.Entities;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Specifications;

public class FeedbackProjectionSpec: Specification<Feedback, FeedbackRecord>
{
    public FeedbackProjectionSpec(bool orderByCreatedAt = false) =>
        Query.OrderByDescending(x => x.CreatedAt, orderByCreatedAt)
            .Select(e => new()
            {
                Id = e.Id,
                Rating = e.Rating,
                Comment = e.Comment,
                WouldRecommend = e.WouldRecommend,
                UserId = e.UserId,
                User = new() { Id = e.User.Id, Name = e.User.Name, Email = e.User.Email, Role = e.User.Role },
                MovieId = e.MovieId,
                Movie = new() { Id = e.Movie.Id, Title = e.Movie.Title, Duration = e.Movie.Duration, Genre = e.Movie.Genre, Description = e.Movie.Description }
            });

    public FeedbackProjectionSpec(Guid id) : this() => Query.Where(e => e.Id == id);

    public FeedbackProjectionSpec(string? search) : this(true)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;
        if (search == null) return;
        var searchExpr = $"%{search.Replace(" ", "%")}%";
        Query.Where(e => EF.Functions.ILike(e.Movie.Title, searchExpr)
                         || EF.Functions.ILike(e.User.Name, searchExpr));
            
    }
}