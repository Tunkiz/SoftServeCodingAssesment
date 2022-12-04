using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoftServeWebApi.Models;
using System.Formats.Asn1;

namespace SoftServeWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private CustumerContext _context;
        public CustomerController(CustumerContext custumerContext)
        {
            _context = custumerContext;
        }

        [EnableCors("customerPolicy")]
        [HttpPost]
        public async Task<ActionResult<Customer>> AddCustomer(Customer customer)
        {
            var today = DateTime.Today;
            customer.Age = age(customer.DateOfBirth);

            customer.UserName= userName(customer.FirstName, customer.LastName);

            if(customer.DateOfBirth > today) { 
                return BadRequest();
            }
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        //Return customer age
        public int age(DateTime dateOfBirth)
        {
            return DateTime.UtcNow.Year - dateOfBirth.Year;
        }
        [EnableCors("customerPolicy")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomrs()
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            return await _context.Customers.ToListAsync();
        }

        [EnableCors("customerPolicy")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> getCustomer(long id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }
        
        [EnableCors("customerPolicy")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Customer>> updateCustomer(long id, Customer customer)
        {
            bool isUpdated = false;
            
            var customerToUpdate = await _context.Customers.FindAsync(id);
            if(customerToUpdate.FirstName != null) {
                customerToUpdate.FirstName = customer.FirstName;
                customerToUpdate.UserName = userName(customer.FirstName, customer.LastName);
                isUpdated = true;
            }
            if(customerToUpdate.LastName != null)
            {   
                customerToUpdate.LastName = customer.LastName;
                customerToUpdate.UserName = userName(customer.FirstName, customer.LastName);
                isUpdated = true;
            }
            if(customerToUpdate.EmailAddress!= null)
            {
                customerToUpdate.EmailAddress = customer.EmailAddress;
            }
            if(!customerToUpdate.DateOfBirth.Equals(null))
            {
                customerToUpdate.Age = age(customer.DateOfBirth);
                customerToUpdate.DateOfBirth = customer.DateOfBirth;
                isUpdated= true;
            }
            
            if (isUpdated)
            {
                customer.DateEdited = DateTime.UtcNow;
                _context.Entry(customerToUpdate).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CustomerExist(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok("Updated");
            }
            else
            {
                return NoContent();
            }
            
            
        }
        //Returns customer userName
        public string userName(string firstname, string lastName)
        {
            return firstname+ " " + lastName;
        }
        
        
        [EnableCors("customerPolicy")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> delete(long id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }

            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
        }
        private bool CustomerExist(long id)
        {
            return (_context.Customers?.Any(e => e.Id == id)).GetValueOrDefault();
        }

    }
}
