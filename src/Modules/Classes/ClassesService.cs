using Microsoft.EntityFrameworkCore;
using schoolAdmission.src.Infrastructure.Data;
using schoolAdmission.src.Infrastructure.Repositories;
using schoolAdmission.src.Modules.Classes.Dtos;
using schoolAdmission.src.Modules.Holds;

namespace schoolAdmission.src.Modules.Classes
{
    public class ClassesService : IClassRepository
    {
        private readonly ApplicationDbContext _context;

        public ClassesService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ClassModel> CreateClassAsync(CreateClassDto dto)
        {
            var trimmedName = dto.Name.Trim();

            var exists = await _context.Classes
                .AnyAsync(c => c.Name.ToLower() == trimmedName.ToLower());

            if (exists)
            {
                throw new InvalidOperationException($"A class with the name '{trimmedName}' already exists.");
            }

            var newClass = new ClassModel
            {
                Id = Guid.NewGuid(),
                Name = trimmedName,
                TotalSeats = dto.TotalSeats!.Value,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Classes.Add(newClass);
            await _context.SaveChangesAsync();

            return newClass;
        }

        public async Task<List<ClassResponseDto>> GetClassesAsync()
        {
            var now = DateTime.UtcNow;

            var classes = await _context.Classes
                .AsNoTracking()
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();

            var classIds = classes.Select(c => c.Id).ToList();

            var holdStats = await _context.Holds
                .AsNoTracking()
                .Where(h => classIds.Contains(h.ClassId))
                .GroupBy(h => h.ClassId)
                .Select(g => new
                {
                    ClassId = g.Key,
                    HeldSeats = g.Count(h => h.Status == HoldStatus.HELD && h.ExpiresAt > now),
                    ConfirmedSeats = g.Count(h => h.Status == HoldStatus.CONFIRMED)
                })
                .ToDictionaryAsync(x => x.ClassId, x => (x.HeldSeats, x.ConfirmedSeats));

            return classes.Select(c =>
            {
                var heldSeats = 0;
                var confirmedSeats = 0;
                if (holdStats.TryGetValue(c.Id, out var stats))
                {
                    heldSeats = stats.HeldSeats;
                    confirmedSeats = stats.ConfirmedSeats;
                }

                var availableSeats = Math.Max(0, c.TotalSeats - heldSeats - confirmedSeats);

                return new ClassResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    TotalSeats = c.TotalSeats,
                    HeldSeats = heldSeats,
                    ConfirmedSeats = confirmedSeats,
                    AvailableSeats = availableSeats
                };
            }).ToList();
        }

        public async Task<ClassResponseDto?> GetClassByIdAsync(Guid id)
        {
            var c = await _context.Classes
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (c == null)
            {
                return null;
            }

            var now = DateTime.UtcNow;

            var heldSeats = await _context.Holds
                .AsNoTracking()
                .CountAsync(h => h.ClassId == id && h.Status == HoldStatus.HELD && h.ExpiresAt > now);

            var confirmedSeats = await _context.Holds
                .AsNoTracking()
                .CountAsync(h => h.ClassId == id && h.Status == HoldStatus.CONFIRMED);

            var availableSeats = Math.Max(0, c.TotalSeats - heldSeats - confirmedSeats);

            return new ClassResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                TotalSeats = c.TotalSeats,
                HeldSeats = heldSeats,
                ConfirmedSeats = confirmedSeats,
                AvailableSeats = availableSeats
            };
        }

        public async Task<ClassModel?> UpdateClassAsync(Guid id, UpdateClassDto dto)
        {
            var existingClass = await _context.Classes.FirstOrDefaultAsync(c => c.Id == id);
            if (existingClass == null)
            {
                return null;
            }

            if (dto.Name is not null)
            {
                var trimmedName = dto.Name.Trim();
                var duplicateName = await _context.Classes
                    .AnyAsync(c => c.Id != id && c.Name.ToLower() == trimmedName.ToLower());

                if (duplicateName)
                {
                    throw new InvalidOperationException($"A class with the name '{trimmedName}' already exists.");
                }

                existingClass.Name = trimmedName;
            }

            if (dto.TotalSeats.HasValue)
            {
                existingClass.TotalSeats = dto.TotalSeats.Value;
            }

            existingClass.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingClass;
        }

        public async Task<bool> DeleteClassAsync(Guid id)
        {
            var existingClass = await _context.Classes.FirstOrDefaultAsync(c => c.Id == id);
            if (existingClass == null)
            {
                return false;
            }

            _context.Classes.Remove(existingClass);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
