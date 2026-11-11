using schoolAdmission.src.Modules.Classes;
using schoolAdmission.src.Modules.Classes.Dtos;

namespace schoolAdmission.src.Infrastructure.Repositories
{
    public interface IClassRepository
    {
        Task<ClassModel> CreateClassAsync(CreateClassDto dto);
        Task<List<ClassResponseDto>> GetClassesAsync();
        Task<ClassResponseDto?> GetClassByIdAsync(Guid id);
        Task<ClassModel?> UpdateClassAsync(Guid id, UpdateClassDto dto);
        Task<bool> DeleteClassAsync(Guid id);
    }
}
