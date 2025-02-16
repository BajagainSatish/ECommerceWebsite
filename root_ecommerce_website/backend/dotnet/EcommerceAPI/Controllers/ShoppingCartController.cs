using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Data;
using EcommerceAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ShoppingCartController : ControllerBase
	{
		private readonly EcommerceDbContext _context;

		public ShoppingCartController(EcommerceDbContext context)
		{
			_context = context;
		}

		// GET: api/ShoppingCart/{userId}
		[HttpGet("{userId}")]
		public async Task<ActionResult<IEnumerable<ShoppingCartItem>>> GetCartItems(string userId)
		{
			var cartItems = await _context.ShoppingCartItems
				.Include(c => c.Product) // Include product details
				.Where(c => c.UserId == userId)
				.ToListAsync();

			if (cartItems == null || cartItems.Count == 0)
			{
				return NotFound(new { message = "Cart is empty." });
			}

			return cartItems;
		}

		// POST: api/ShoppingCart
		[HttpPost]
		public async Task<ActionResult<ShoppingCartItem>> AddToCart(ShoppingCartItem cartItem)
		{
			// Check if the product exists and include the related entities (Category and Brand)
			var product = await _context.Products
				.Include(p => p.Brand)  // Include the Brand details
				.Include(p => p.Category)  // Include the Category details
				.FirstOrDefaultAsync(p => p.id == cartItem.ProductId);

			if (product == null)
			{
				return BadRequest(new { message = "Invalid Product ID." });
			}

			// Check if item already exists in the cart for this user
			var existingCartItem = await _context.ShoppingCartItems
				.FirstOrDefaultAsync(c => c.UserId == cartItem.UserId && c.ProductId == cartItem.ProductId);

			if (existingCartItem != null)
			{
				// Update quantity if the item already exists
				existingCartItem.Quantity += cartItem.Quantity;
			}
			else
			{
				// Add a new cart item if it doesn't already exist
				_context.ShoppingCartItems.Add(cartItem);
			}

			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetCartItems), new { userId = cartItem.UserId }, cartItem);
		}

		// PUT: api/ShoppingCart/{id}
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateCartItem(int id, ShoppingCartItem cartItem)
		{
			if (id != cartItem.Id)
			{
				return BadRequest("Cart item ID mismatch.");
			}

			var existingCartItem = await _context.ShoppingCartItems.FindAsync(id);
			if (existingCartItem == null)
			{
				return NotFound(new { message = "Cart item not found." });
			}

			existingCartItem.Quantity = cartItem.Quantity;
			await _context.SaveChangesAsync();

			return NoContent();
		}

		// DELETE: api/ShoppingCart/{id}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCartItem(int id)
		{
			var cartItem = await _context.ShoppingCartItems.FindAsync(id);
			if (cartItem == null)
			{
				return NotFound(new { message = "Cart item not found." });
			}

			_context.ShoppingCartItems.Remove(cartItem);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
