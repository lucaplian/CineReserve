namespace MobyLabWebProgramming.Services.DataTransferObjects;

public class FeedbackAddRecord
{
    public int Rating { get; set; }
    public string Comment { get; set; } = null!;
    public bool? WouldRecommend { get; set; }
    
    public Guid MovieId { get; set; }

}