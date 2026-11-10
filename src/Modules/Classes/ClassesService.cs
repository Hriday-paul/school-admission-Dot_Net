using Microsoft.EntityFrameworkCore;
using schoolAdmission.src.Infrastructure.Data;
using schoolAdmission.src.Infrastructure.Repositories;
using schoolAdmission.src.Modules.Classes.Dtos;

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

        public async Task<List<ClassModel>> GetClassesAsync()
        {
            return await _context.Classes
                .AsNoTracking()
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();
        }

        public async Task<ClassModel?> GetClassByIdAsync(Guid id)
        {
            return await _context.Classes
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);
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
