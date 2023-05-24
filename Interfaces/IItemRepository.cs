using ListApp.Models;

namespace ListApp.Interfaces
{
    public interface IItemRepository
    {
        Task<IEnumerable<Item>> GetItems();
        Task<Item> GetItem(Guid id);
        Task CreateItem(Item item);
        Task DeleteItem(Item item);
        Task UpdateItem(Item item);
    }
}
