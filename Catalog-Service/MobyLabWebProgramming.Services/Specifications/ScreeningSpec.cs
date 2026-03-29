using MobyLabWebProgramming.Database.Repository.Entities;
using Ardalis.Specification;
namespace MobyLabWebProgramming.Services.Specifications;

public class ScreeningSpec: Specification<Screening>
{
    public ScreeningSpec(Guid id) => Query.Where(e => e.Id == id);
}