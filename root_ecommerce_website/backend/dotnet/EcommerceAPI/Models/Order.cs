namespace EcommerceAPI.Models
{
	public class Order
	{
		public int OrderId { get; set; }
		public string UserId { get; set; }  // Assuming user_id is a string (can be changed as needed)
		public string Address { get; set; }
		public decimal TotalAmount { get; set; }
		public string PaymentStatus { get; set; }  // "Pending" or "Completed"
	}
}
