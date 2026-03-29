using System.Text.Json.Serialization;
using MobyLabWebProgramming.Database.Repository.Enums;

namespace MobyLabWebProgramming.Services.DataTransferObjects;

public class UserRecord
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public UserRoleEnum Role { get; set; }
}