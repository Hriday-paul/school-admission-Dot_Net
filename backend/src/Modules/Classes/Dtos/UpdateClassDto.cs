using System.ComponentModel.DataAnnotations;

namespace schoolAdmission.src.Modules.Classes.Dtos
{
    public class UpdateClassDto : IValidatableObject
    {
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Class name must be between 1 and 100 characters")]
        public string? Name { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Total seats must be at least 1")]
        public int? TotalSeats { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Name is null && TotalSeats is null)
            {
                yield return new ValidationResult(
                    "At least one field (name or totalSeats) must be provided for update",
                    new[] { nameof(Name), nameof(TotalSeats) });
            }
            else if (Name is not null && string.IsNullOrWhiteSpace(Name))
            {
                yield return new ValidationResult(
                    "Class name cannot be empty or whitespace",
                    new[] { nameof(Name) });
            }
        }
    }
}
