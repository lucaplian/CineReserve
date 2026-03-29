namespace MobyLabWebProgramming.Services.DataTransferObjects;

public record BookingUpdateRecord(Guid Id, Guid? UserId=null, Guid? ScreeningId=null);