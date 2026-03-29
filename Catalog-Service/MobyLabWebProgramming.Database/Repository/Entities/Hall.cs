using MobyLabWebProgramming.Database.Repository.Enums;
using MobyLabWebProgramming.Infrastructure.BaseObjects;

namespace MobyLabWebProgramming.Database.Repository.Entities;

public class Hall : BaseEntity
{
    public string Name { get; set; } = null!;
    public int Capacity { get; set; }
    public ICollection<Screening> Screenings { get; set; } = null!;
}