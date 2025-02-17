using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceAPI.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Required]
        public string name { get; set; }
        public string? image { get; set; }

        [Required]
        public int brandId { get; set; }

        [ForeignKey("brandId")]
        public Brand? Brand { get; set; }  // Set Brand as nullable to avoid validation issues

        public int stock { get; set; }

        [Required]
        public int categoryId { get; set; }

        [ForeignKey("categoryId")]
        public Category? Category { get; set; }  // Set Category as nullable to avoid validation issues

        public float price { get; set; }
        public string details { get; set; }
        public bool isFeatured { get; set; }
        public float inventoryValue { get; set; }
        public float salePrice { get; set; }
    }
}
