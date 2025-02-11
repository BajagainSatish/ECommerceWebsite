using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Models;

namespace EcommerceAPI.Data
{
	public class EcommerceDbContext : DbContext
	{
		public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options)
			: base(options)
		{
		}

		public DbSet<Brand> Brands { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Product> Products { get; set; }
	}
}
