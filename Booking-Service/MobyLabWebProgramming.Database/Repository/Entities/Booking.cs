using MobyLabWebProgramming.Infrastructure.BaseObjects;
namespace MobyLabWebProgramming.Database.Repository.Entities;

public class Booking : BaseEntity
{
    public Guid UserId { get; set; }
    
    public Guid ScreeningId { get; set; }
}