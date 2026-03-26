using MobyLabWebProgramming.Database.Repository.Enums;
using MobyLabWebProgramming.Infrastructure.BaseObjects;

namespace MobyLabWebProgramming.Database.Repository.Entities;

public class Feedback : BaseEntity
{
    public int Rating { get; set; }
    public string Comment { get; set; } = null!;
    public bool? WouldRecommend { get; set; }
    
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    
    public Guid MovieId { get; set; }
    public Movie Movie { get; set; } = null!;
    
}