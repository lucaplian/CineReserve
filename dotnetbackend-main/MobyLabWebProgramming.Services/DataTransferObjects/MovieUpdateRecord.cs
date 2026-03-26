using MobyLabWebProgramming.Database.Repository.Enums;

namespace MobyLabWebProgramming.Services.DataTransferObjects;

public record MovieUpdateRecord(Guid Id, string? Title = null, string? Description = null, int? Duration = null, GenreEnum? Genre = null);