using schoolAdmission.src.Modules.Holds;

namespace schoolAdmission.src.Infrastructure.Repositories
{
    public interface IHoldRepository
    {
        Task<HoldModel> CreateHoldAsync(Guid classId, string studentId);
        Task<HoldModel?> GetHoldByIdAsync(Guid holdId);
        Task<HoldModel?> ConfirmHoldAsync(Guid holdId);
        Task<bool> DeleteHoldAsync(Guid holdId);
    }
}
