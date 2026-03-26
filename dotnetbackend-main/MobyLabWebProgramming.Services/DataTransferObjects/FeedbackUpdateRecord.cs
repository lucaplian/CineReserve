namespace MobyLabWebProgramming.Services.DataTransferObjects;

public record FeedbackUpdateRecord(Guid Id, int? Rating = null, string? Comment = null, bool? WouldRecommend = null, Guid? UserId = null, Guid? MovieId = null );
