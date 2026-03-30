using MobyLabWebProgramming.Database.Repository;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Services.Extensions;
using Prometheus;

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
        builder.Services.UseHttpClientMetrics();       

        var app = builder
            .Build()
            .ConfigureApplication(ApplicationName)
            .MigrateDatabase<WebAppDatabaseContext>();
        app.UseMetricServer();
        app.UseHttpMetrics();
         
        
        app.Run();
    }
}