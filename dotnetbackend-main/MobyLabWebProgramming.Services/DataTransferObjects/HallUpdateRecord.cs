namespace MobyLabWebProgramming.Services.DataTransferObjects;

public record HallUpdateRecord(Guid Id, string? Name = null, int? Capacity = null);
