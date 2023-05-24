using Microsoft.EntityFrameworkCore;

namespace ListApp.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }
    }
}
