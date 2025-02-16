using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models
{
	public class Order
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int OrderId { get; set; }

		[Required]
		public string UserId { get; set; }  // Assuming user_id is a string (can be changed as needed)
		[Required]
		public string Address { get; set; }
		[Required]
		public decimal TotalAmount { get; set; }
		[Required]
		public string PaymentStatus { get; set; }  // "Pending" or "Completed"
		[Required]
		public string CartItemsJson { get; set; }  // Store the cart items in JSON format
	}
}
