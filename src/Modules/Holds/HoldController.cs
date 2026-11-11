using Microsoft.AspNetCore.Mvc;
using schoolAdmission.src.Infrastructure.Repositories;
using schoolAdmission.src.utils;

namespace schoolAdmission.src.Modules.Holds
{
    [ApiController]
    [Route("api/holds")]
    public class HoldController : ControllerBase
    {
        private readonly IHoldRepository _holdRepository;

        public HoldController(IHoldRepository holdRepository)
        {
            _holdRepository = holdRepository;
        }

        [HttpGet("{holdId:guid}")]
        public async Task<IActionResult> GetHoldById(Guid holdId)
        {
            var hold = await _holdRepository.GetHoldByIdAsync(holdId);
            if (hold == null)
            {
                return NotFound(SendResponse<object>.Error("Hold not found", null));
            }

            return Ok(SendResponse<HoldModel>.Success("Hold retrieved successfully", hold));
        }

        [HttpPost("{holdId:guid}/confirm")]
        public async Task<IActionResult> ConfirmHold(Guid holdId)
        {
            try
            {
                var hold = await _holdRepository.ConfirmHoldAsync(holdId);
                if (hold == null)
                {
                    return NotFound(SendResponse<object>.Error("Hold not found", null));
                }

                return Ok(SendResponse<HoldModel>.Success("Hold confirmed successfully", hold));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(SendResponse<object>.Error(ex.Message, null));
            }
        }

        [HttpDelete("{holdId:guid}")]
        public async Task<IActionResult> DeleteHold(Guid holdId)
        {
            var deleted = await _holdRepository.DeleteHoldAsync(holdId);
            if (!deleted)
            {
                return NotFound(SendResponse<object>.Error("Hold not found", null));
            }

            return NoContent();
        }
    }
}
