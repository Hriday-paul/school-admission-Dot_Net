using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using schoolAdmission.src.Modules.Classes;

namespace schoolAdmission.src.Modules.Holds
{
    [Table("holds")]
    public class HoldModel
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("status")]
        public HoldStatus Status { get; set; } = HoldStatus.HELD;

        [Required]
        [Column("classId")]
        public Guid ClassId { get; set; }

        [ForeignKey(nameof(ClassId))]
        public ClassModel? Class { get; set; }

        [Required]
        [Column("expiresAt")]
        public DateTime ExpiresAt { get; set; }

        [Required]
        [Column("studentId")]
        public string StudentId { get; set; } = string.Empty;

        [Column("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
