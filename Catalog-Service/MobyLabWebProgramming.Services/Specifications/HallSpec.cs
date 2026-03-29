using Ardalis.Specification;
using MobyLabWebProgramming.Database.Repository.Entities;
namespace MobyLabWebProgramming.Services.Specifications;

public class HallSpec: Specification<Hall>
{
    public HallSpec(Guid id) => Query.Where(e => e.Id == id);

}