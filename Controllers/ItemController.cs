using ListApp.Interfaces;
using ListApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace ListApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : Controller
    {
        private readonly IItemRepository _itemRepository;

        public ItemController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await _itemRepository.GetItems();

            if (items == null)
            {
                return NotFound();
            }

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(Guid id)
        {
            var item = await _itemRepository.GetItem(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult> CreateItem([FromBody] Item item)
        {
            if(item == null)
            {
                BadRequest();
            }

            await _itemRepository.CreateItem(item);
            return Json(item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItem(Guid id, [FromBody] Item item)
        {
            if (id != item.Id)
            {
                BadRequest();
            }

            await _itemRepository.UpdateItem(item);
            return Json(item);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(Guid id)
        {
            var item = await _itemRepository.GetItem(id);

            if(item == null)
            {
                return NotFound();
            }

            await _itemRepository.DeleteItem(item);
            return NoContent();
        }
    }
}
