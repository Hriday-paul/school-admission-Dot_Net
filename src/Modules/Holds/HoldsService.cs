using Microsoft.EntityFrameworkCore;
using schoolAdmission.src.Infrastructure.Data;
using schoolAdmission.src.Infrastructure.Repositories;
using schoolAdmission.src.Shared.Services;

namespace schoolAdmission.src.Modules.Holds
{
    public class HoldsService : IHoldRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IClassSeatsNotifier _notifier;

        public HoldsService(ApplicationDbContext context, IClassSeatsNotifier notifier)
        {
            _context = context;
            _notifier = notifier;
        }

        private TimeSpan GetHoldDuration()
        {
            var envValue = Environment.GetEnvironmentVariable("HOLD_DURATION_SECONDS");
            if (!string.IsNullOrWhiteSpace(envValue) && int.TryParse(envValue.Trim(), out var seconds) && seconds > 0)
            {
                return TimeSpan.FromSeconds(seconds);
            }

            return TimeSpan.FromSeconds(600);
        }

        public async Task<HoldModel> CreateHoldAsync(Guid classId, string studentId)
        {
            var targetClass = await _context.Classes.FirstOrDefaultAsync(c => c.Id == classId);
            if (targetClass == null)
            {
                throw new KeyNotFoundException($"Class with ID '{classId}' was not found.");
            }

            var now = DateTime.UtcNow;

            // Check if there are active holds or confirmed enrollments exceeding totalSeats
            var activeHoldsOrConfirmedCount = await _context.Holds
                .CountAsync(h => h.ClassId == classId &&
                                 (h.Status == HoldStatus.CONFIRMED ||
                                  (h.Status == HoldStatus.HELD && h.ExpiresAt > now)));

            if (activeHoldsOrConfirmedCount >= targetClass.TotalSeats)
            {
                throw new InvalidOperationException("No seats available for this class.");
            }

            // Check if student already has an active hold or confirmed seat for this class
            var existingStudentHold = await _context.Holds
                .FirstOrDefaultAsync(h => h.ClassId == classId &&
                                         h.StudentId == studentId &&
                                         (h.Status == HoldStatus.CONFIRMED ||
                                          (h.Status == HoldStatus.HELD && h.ExpiresAt > now)));

            if (existingStudentHold != null)
            {
                if (existingStudentHold.Status == HoldStatus.CONFIRMED)
                {
                    throw new InvalidOperationException("Student already confirmed a seat in this class.");
                }

                throw new InvalidOperationException("Student already has an active hold for this class.");
            }

            var holdDuration = GetHoldDuration();

            var hold = new HoldModel
            {
                Id = Guid.NewGuid(),
                ClassId = classId,
                StudentId = studentId,
                Status = HoldStatus.HELD,
                ExpiresAt = now.Add(holdDuration),
                CreatedAt = now,
                UpdatedAt = now
            };

            _context.Holds.Add(hold);
            await _context.SaveChangesAsync();

            await _notifier.NotifyClassSeatsChangedAsync(classId);

            return hold;
        }

        public async Task<HoldModel?> GetHoldByIdAsync(Guid holdId)
        {
            var hold = await _context.Holds.FirstOrDefaultAsync(h => h.Id == holdId);

            if (hold == null)
            {
                return null;
            }

            // Update expired status dynamically if needed
            if (hold.Status == HoldStatus.HELD && hold.ExpiresAt <= DateTime.UtcNow)
            {
                hold.Status = HoldStatus.EXPIRED;
                await _context.SaveChangesAsync();
            }

            return hold;
        }

        public async Task<List<HoldModel>> GetHoldsByStudentIdAsync(string studentId)
        {
            var holds = await _context.Holds
                .Include(h => h.Class)
                .Where(h => h.StudentId == studentId)
                .OrderByDescending(h => h.CreatedAt)
                .ToListAsync();

            return holds;
        }

        public async Task<HoldModel?> ConfirmHoldAsync(Guid holdId)
        {
            var hold = await _context.Holds
                .Include(h => h.Class)
                .FirstOrDefaultAsync(h => h.Id == holdId);

            if (hold == null)
            {
                return null;
            }

            var now = DateTime.UtcNow;

            if (hold.Status == HoldStatus.CONFIRMED)
            {
                throw new InvalidOperationException("Hold is already confirmed.");
            }

            if (hold.Status == HoldStatus.CANCELLED)
            {
                throw new InvalidOperationException("Cannot confirm a cancelled hold.");
            }

            if (hold.Status == HoldStatus.EXPIRED || hold.ExpiresAt <= now)
            {
                hold.Status = HoldStatus.EXPIRED;
                await _context.SaveChangesAsync();
                throw new InvalidOperationException("Hold has expired and cannot be confirmed.");
            }

            hold.Status = HoldStatus.CONFIRMED;
            hold.UpdatedAt = now;

            await _context.SaveChangesAsync();

            await _notifier.NotifyClassSeatsChangedAsync(hold.ClassId);

            return hold;
        }

        public async Task<bool> DeleteHoldAsync(Guid holdId)
        {
            var hold = await _context.Holds.FirstOrDefaultAsync(h => h.Id == holdId);
            if (hold == null)
            {
                return false;
            }

            var classId = hold.ClassId;
            hold.Status = HoldStatus.CANCELLED;
            hold.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            await _notifier.NotifyClassSeatsChangedAsync(classId);

            return true;
        }
    }
}
