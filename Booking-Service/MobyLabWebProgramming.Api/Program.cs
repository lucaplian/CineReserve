using MobyLabWebProgramming.Database.Repository;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Services.Client;
using MobyLabWebProgramming.Services.Extensions;

namespace MobyLabWebProgramming.Api;

public static class Program
{
    private const string ApplicationName = "CineReserve";
    
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        builder.AddCorsConfiguration()
            .AddRepository()
            .AddAuthorizationWithSwagger(ApplicationName)
            .AddServices()
            .UseLogger()
            .AddWorkers()
            .AddApi();
        
        builder.Services.AddHttpClient<AuthServiceClient>(client =>
        {
            client.BaseAddress = new Uri("http://cinereserve-auth-service:8080");
        });

        var app = builder
            .Build()
            .ConfigureApplication(ApplicationName)
            .MigrateDatabase<WebAppDatabaseContext>();
        
        
        
        app.Run();
    }
}