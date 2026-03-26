namespace MobyLabWebProgramming.Services.DataTransferObjects;

public class BookingRecord
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public UserRecord User { get; set; } = null!;
    
    public Guid ScreeningId { get; set; }
    public ScreeningRecord Screening { get; set; } = null!;
}