using Ardalis.Specification;
using MobyLabWebProgramming.Database.Repository.Entities;

namespace MobyLabWebProgramming.Services.Specifications;

public class FeedbackSpec : Specification<Feedback>
{
    public FeedbackSpec(Guid id) => Query.Where(e => e.Id == id);

}