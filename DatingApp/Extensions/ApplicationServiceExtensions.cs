using DatingApp.Data;
using DatingApp.Interfaces;
using DatingApp.Services;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationService(this IServiceCollection Services, IConfiguration Configuration)
    {
        Services.AddDbContext<DataContext>(opt =>
        {
             opt.UseSqlite(Configuration.GetConnectionString("DefaultConnectionString"));
        });
        Services.AddScoped<ITokenServices, TokenService>();
        return Services;
    }
}
