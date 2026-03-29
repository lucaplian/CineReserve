using Ardalis.Specification;
using MobyLabWebProgramming.Database.Repository.Entities;
namespace MobyLabWebProgramming.Services.Specifications;

public class MovieSpec: Specification<Movie>
{
    public MovieSpec(Guid id) => Query.Where(e => e.Id == id);
}