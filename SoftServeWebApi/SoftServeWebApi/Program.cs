using Microsoft.EntityFrameworkCore;
using SoftServeWebApi.Models;

namespace SoftServeWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("customerPolicy",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3000")
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS")
                        .SetPreflightMaxAge(TimeSpan.FromSeconds(3600));
                    });
            });
            builder.Services.AddDbContext<CustumerContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("CustomerContext"));
            });
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors();
            app.MapControllers();

            app.Run();
        }
    }
}