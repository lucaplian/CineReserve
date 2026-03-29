using MobyLabWebProgramming.Database.Repository.Enums;
using MobyLabWebProgramming.Infrastructure.BaseObjects;

namespace MobyLabWebProgramming.Database.Repository.Entities;

public class Feedback : BaseEntity
{
    public int Rating { get; set; }
    public string Comment { get; set; } = null!;
    public bool? WouldRecommend { get; set; }
    
    public Guid UserId { get; set; }
    
    public Guid MovieId { get; set; }
    
}