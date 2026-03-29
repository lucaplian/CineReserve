using MobyLabWebProgramming.Database.Repository.Enums;

namespace MobyLabWebProgramming.Services.DataTransferObjects;

public class ScreeningRecord
{
    public Guid Id { get; set; }
    public DateTime StartTime { get; set; }
    
    public Guid MovieId { get; set; }
    public MovieRecord Movie { get; set; } = null!;
    
    public Guid HallId { get; set; }
    public HallRecord Hall { get; set; } = null!;
    public ScreenEnum ScreenType { get; set; }

}