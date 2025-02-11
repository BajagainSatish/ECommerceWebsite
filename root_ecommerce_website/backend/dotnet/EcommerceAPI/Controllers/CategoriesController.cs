using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Data;
using EcommerceAPI.Models;

namespace EcommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoriesController : ControllerBase
	{
		private readonly EcommerceDbContext _context;

		public CategoriesController(EcommerceDbContext context)
		{
			_context = context;
		}

		// GET: api/categories
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
		{
			return await _context.Categories.ToListAsync();
		}

		// GET: api/categories/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Category>> GetCategory(int id)
		{
			var category = await _context.Categories.FindAsync(id);
			if (category == null)
			{
				return NotFound();
			}
			return category;
		}

		// POST: api/categories
		[HttpPost]
		public async Task<ActionResult<Category>> PostCategory(Category category)
		{
			_context.Categories.Add(category);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetCategory), new { id = category.id }, category);
		}

		// PUT: api/categories/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutCategory(int id, Category category)
		{
			if (id != category.id)
			{
				return BadRequest("The ID in the URL does not match the ID in the body.");
			}

			_context.Entry(category).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CategoryExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}
			return NoContent();
		}

		// DELETE: api/categories/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCategory(int id)
		{
			var category = await _context.Categories.FindAsync(id);
			if (category == null)
			{
				return NotFound();
			}
			_context.Categories.Remove(category);
			await _context.SaveChangesAsync();
			return NoContent();
		}

		private bool CategoryExists(int id)
		{
			return _context.Categories.Any(e => e.id == id);
		}
	}
}
