using MobyLabWebProgramming.Database.Repository.Enums;
namespace MobyLabWebProgramming.Services.DataTransferObjects;

public class MovieAddRecord
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int Duration { get; set; }
    public GenreEnum Genre { get; set; }
}