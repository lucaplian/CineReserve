using MobyLabWebProgramming.Database.Repository.Enums;

namespace MobyLabWebProgramming.Services.DataTransferObjects;

public class ScreeningAddRecord
{
    public DateTime StartTime { get; set; }
    public Guid MovieId { get; set; }
    public Guid HallId { get; set; }
    public ScreenEnum ScreenType { get; set; }
}