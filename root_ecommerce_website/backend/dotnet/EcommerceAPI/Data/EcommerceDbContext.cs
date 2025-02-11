using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Models;

namespace EcommerceAPI.Data
{
	public class EcommerceDbContext : DbContext
	{
		public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options) : base(options) { }

		public DbSet<Product> Products { get; set; }
		public DbSet<Brand> Brands { get; set; }
		public DbSet<Category> Categories { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Product>()
				.HasOne(p => p.Brand)
				.WithMany()
				.HasForeignKey(p => p.brandId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Product>()
				.HasOne(p => p.Category)
				.WithMany()
				.HasForeignKey(p => p.categoryId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
