using Microsoft.AspNetCore.Mvc;
using schoolAdmission.src.Infrastructure.Repositories;
using schoolAdmission.src.Modules.Classes.Dtos;
using schoolAdmission.src.Modules.Holds;
using schoolAdmission.src.Shared.Filters;
using schoolAdmission.src.utils;

namespace schoolAdmission.src.Modules.Classes
{
    [ApiController]
    [Route("api/classes")]
    [Route("classes")]
    public class ClassController : ControllerBase
    {
        private readonly IClassRepository _classRepository;
        private readonly IHoldRepository _holdRepository;

        public ClassController(IClassRepository classRepository, IHoldRepository holdRepository)
        {
            _classRepository = classRepository;
            _holdRepository = holdRepository;
        }

        [HttpPost("{classId:guid}/holds")]
        [ValidateStudentIdHeader]
        public async Task<IActionResult> CreateHold([FromRoute] Guid classId)
        {
            try
            {
                var studentId = HttpContext.Items[ValidateStudentIdHeaderAttribute.HttpContextItemKey]?.ToString()
                    ?? HttpContext.Request.Headers[ValidateStudentIdHeaderAttribute.HeaderName].ToString();

                var hold = await _holdRepository.CreateHoldAsync(classId, studentId);

                return StatusCode(
                    StatusCodes.Status201Created,
                    SendResponse<HoldModel>.Success("Hold created successfully", hold));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(SendResponse<object>.Error(ex.Message, null));
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(SendResponse<object>.Error(ex.Message, null));
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateClass([FromBody] CreateClassDto dto)
        {
            try
            {
                var createdClass = await _classRepository.CreateClassAsync(dto);
                return StatusCode(
                    StatusCodes.Status201Created,
                    SendResponse<ClassModel>.Success("Class created successfully", createdClass));
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(SendResponse<object>.Error(ex.Message, null));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetClasses()
        {
            var classes = await _classRepository.GetClassesAsync();
            return Ok(SendResponse<List<ClassResponseDto>>.Success("Classes retrieved successfully", classes));
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetClassById(Guid id)
        {
            var classItem = await _classRepository.GetClassByIdAsync(id);
            if (classItem == null)
            {
                return NotFound(SendResponse<object>.Error("Class not found", null));
            }

            return Ok(SendResponse<ClassResponseDto>.Success("Class retrieved successfully", classItem));
        }

        [HttpPut("{id:guid}")]
        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> UpdateClass(Guid id, [FromBody] UpdateClassDto dto)
        {
            try
            {
                var updatedClass = await _classRepository.UpdateClassAsync(id, dto);
                if (updatedClass == null)
                {
                    return NotFound(SendResponse<object>.Error("Class not found", null));
                }

                return Ok(SendResponse<ClassModel>.Success("Class updated successfully", updatedClass));
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(SendResponse<object>.Error(ex.Message, null));
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteClass(Guid id)
        {
            var deleted = await _classRepository.DeleteClassAsync(id);
            if (!deleted)
            {
                return NotFound(SendResponse<object>.Error("Class not found", null));
            }

            return Ok(SendResponse<object?>.Success("Class deleted successfully", null));
        }
    }
}
