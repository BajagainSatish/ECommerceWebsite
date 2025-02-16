using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Models;
using EcommerceAPI.Data;
namespace EcommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrdersController : ControllerBase
	{
		private readonly EcommerceDbContext _context;

		public OrdersController(EcommerceDbContext context)
		{
			_context = context;
		}

		// GET: api/orders
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
		{
			return await _context.Orders.ToListAsync();
		}

		// GET: api/orders/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Order>> GetOrder(int id)
		{
			var order = await _context.Orders.FindAsync(id);

			if (order == null)
			{
				return NotFound();
			}

			return order;
		}

		// POST: api/Orders
		[HttpPost]
		public async Task<ActionResult<Order>> CreateOrder(Order order)
		{
			// Optional: Validate and process the order here

			// Save the order in the database
			_context.Orders.Add(order);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
		}

		// PUT: api/orders/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutOrder(int id, Order order)
		{
			if (id != order.OrderId)
			{
				return BadRequest();
			}

			_context.Entry(order).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			return NoContent();
		}

		// DELETE: api/orders/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteOrder(int id)
		{
			var order = await _context.Orders.FindAsync(id);
			if (order == null)
			{
				return NotFound();
			}

			_context.Orders.Remove(order);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
