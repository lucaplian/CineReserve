namespace MobyLabWebProgramming.Services.DataTransferObjects;

public class HallRecord
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public int Capacity { get; set; }

}