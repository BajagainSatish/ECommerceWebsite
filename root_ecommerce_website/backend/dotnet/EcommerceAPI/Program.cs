using EcommerceAPI.Data; // Make sure this matches your project's namespace for the DbContext
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
					  policy =>
					  {
						  // Allow both HTTP and HTTPS for local development
						  policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
								.AllowAnyHeader()
								.AllowAnyMethod();
					  });
});
// Add OpenAPI support
builder.Services.AddOpenApi();
// Add services to the container.
builder.Services.AddControllers(); // Ensure this line exists
builder.Services.AddEndpointsApiExplorer();


// Retrieve the connection string from configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Register the DbContext with the DI container using SQL Server
builder.Services.AddDbContext<EcommerceDbContext>(options =>
	options.UseSqlServer(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();
}

//app.UseHttpsRedirection();

var summaries = new[]
{
	"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
	var forecast = Enumerable.Range(1, 5).Select(index =>
		new WeatherForecast
		(
			DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
			Random.Shared.Next(-20, 55),
			summaries[Random.Shared.Next(summaries.Length)]
		))
		.ToArray();
	return forecast;
})
.WithName("GetWeatherForecast");

app.UseCors(MyAllowSpecificOrigins); // Add this before app.UseAuthorization()
app.UseAuthorization();
app.MapControllers(); // Ensure this line exists
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
	public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
