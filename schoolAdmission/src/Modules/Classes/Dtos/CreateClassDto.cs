using System.ComponentModel.DataAnnotations;

namespace schoolAdmission.src.Modules.Classes.Dtos
{
    public class CreateClassDto
    {
        [Required(ErrorMessage = "Class name is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Class name must be between 1 and 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Total seats is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Total seats must be at least 1")]
        public int? TotalSeats { get; set; }
    }
}
