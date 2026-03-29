namespace MobyLabWebProgramming.Services.DataTransferObjects;

public class FeedbackRecord
{
    public Guid Id { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; } = null!;
    public bool? WouldRecommend { get; set; }
    
    public Guid UserId { get; set; }
    
    public Guid MovieId { get; set; }
}