using Microsoft.EntityFrameworkCore;

namespace SoftServeWebApi.Models
{
    public class CustumerContext: DbContext
    {
        public CustumerContext(DbContextOptions<CustumerContext> options): base(options)
        {

        }
        public DbSet<Customer> Customers { get; set; } = null!;

       
    }
}
