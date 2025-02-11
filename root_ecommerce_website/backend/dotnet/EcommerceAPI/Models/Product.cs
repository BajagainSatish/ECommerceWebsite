namespace EcommerceAPI.Models
{
	public class Product
	{
		public int id { get; set; }
		public string name { get; set; }
		public string image { get; set; }
		public string brand { get; set; }
		public int stock { get; set; }
		public string category { get; set; }
		public float price { get; set; }
		public string details { get; set; }
		public bool isFeatured { get; set; }
		public float inventoryValue { get; set; }
		public float salePrice { get; set; }

	}
}
