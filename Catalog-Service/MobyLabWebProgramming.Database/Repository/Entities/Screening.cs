using MobyLabWebProgramming.Infrastructure.BaseObjects;
using MobyLabWebProgramming.Database.Repository.Enums;

namespace MobyLabWebProgramming.Database.Repository.Entities;

public class Screening : BaseEntity
{
    public DateTime StartTime { get; set; }
    
    public Guid MovieId { get; set; }
    public Movie Movie { get; set; } = null!;
    
    public Guid HallId { get; set; }
    public Hall Hall { get; set; } = null!;
    
    public ScreenEnum ScreenType { get; set; }

}