using ListApp.Interfaces;
using ListApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ListApp.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly AppDBContext _context;

        public ItemRepository(AppDBContext context)
        {
            _context = context;
        }

        public async Task CreateItem(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteItem(Item item)
        {
            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task<Item> GetItem(Guid id)
        {
            return await _context.Items.FindAsync(id);
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            return await _context.Items.OrderBy(i => i.Name).ToListAsync();
        }

        public async Task UpdateItem(Item item)
        {
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
