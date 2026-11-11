using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace schoolAdmission.src.Infrastructure.Data.Configurations
{
    public class HoldConfiguration : IEntityTypeConfiguration<schoolAdmission.src.Modules.Holds.HoldModel>
    {
        public void Configure(EntityTypeBuilder<schoolAdmission.src.Modules.Holds.HoldModel> builder)
        {
            builder.ToTable("holds");

            builder.HasKey(h => h.Id);

            builder.Property(h => h.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            builder.Property(h => h.Status)
                .HasColumnName("status")
                .HasConversion<string>()
                .IsRequired();

            builder.Property(h => h.ClassId)
                .HasColumnName("classId")
                .IsRequired();

            builder.HasOne(h => h.Class)
                .WithMany()
                .HasForeignKey(h => h.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(h => h.ExpiresAt)
                .HasColumnName("expiresAt")
                .IsRequired();

            builder.Property(h => h.StudentId)
                .HasColumnName("studentId")
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(h => h.CreatedAt)
                .HasColumnName("createdAt")
                .IsRequired();

            builder.Property(h => h.UpdatedAt)
                .HasColumnName("updatedAt")
                .IsRequired();

            builder.HasIndex(h => h.ClassId);
            builder.HasIndex(h => h.StudentId);
            builder.HasIndex(h => h.Status);
        }
    }
}
