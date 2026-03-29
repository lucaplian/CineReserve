namespace MobyLabWebProgramming.Services.DataTransferObjects;

public class BookingRecord
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    
    public Guid ScreeningId { get; set; }
}