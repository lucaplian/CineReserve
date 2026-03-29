using System.Net.Http.Json;
using System.Text.Json;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Services.Client;

public class AuthServiceClient(HttpClient httpClient)
{
    public async Task<UserRecord?> GetUser(Guid userId)
    {
        var response = await httpClient.GetAsync($"/api/User/GetById/{userId}");
        if (!response.IsSuccessStatusCode) return null;
        var json = await response.Content.ReadAsStringAsync();
        var doc = JsonDocument.Parse(json);
    
        var responseElement = doc.RootElement.GetProperty("response");
        return JsonSerializer.Deserialize<UserRecord>(responseElement.GetRawText());
    }
}
