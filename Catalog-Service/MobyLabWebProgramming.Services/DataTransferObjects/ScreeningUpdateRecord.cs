using MobyLabWebProgramming.Database.Repository.Enums;

namespace MobyLabWebProgramming.Services.DataTransferObjects;

public record ScreeningUpdateRecord(Guid Id, DateTime? StartTime = null, Guid? MovieId = null, Guid? HallId = null, ScreenEnum? ScreenType = null);