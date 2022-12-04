using System.ComponentModel.DataAnnotations;

namespace SoftServeWebApi.Models
{
    public class Customer
    {
        
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? EmailAddress { get; set; }
        public DateTime DateOfBirth { get; set; } 
        public int Age { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime? DateEdited { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
