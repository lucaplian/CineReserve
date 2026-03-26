using MobyLabWebProgramming.Database.Repository.Enums;
using MobyLabWebProgramming.Infrastructure.BaseObjects;

namespace MobyLabWebProgramming.Database.Repository.Entities;

public class Movie : BaseEntity
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    
    public int Duration { get; set; }
    public GenreEnum Genre { get; set; }
    
    public ICollection<Screening> Screenings { get; set; } = null!;
    public ICollection<Feedback> Feedbacks { get; set; } = null!;
}