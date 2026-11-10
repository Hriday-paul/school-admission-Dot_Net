using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using schoolAdmission.src.Modules.Classes;

namespace schoolAdmission.src.Infrastructure.Data.Configurations
{
    public class ClassConfiguration : IEntityTypeConfiguration<ClassModel>
    {
        public void Configure(EntityTypeBuilder<ClassModel> builder)
        {
            builder.ToTable("classes");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            builder.Property(c => c.Name)
                .HasColumnName("name")
                .IsRequired()
                .HasMaxLength(100);

            builder.HasIndex(c => c.Name)
                .IsUnique();

            builder.Property(c => c.TotalSeats)
                .HasColumnName("totalSeats")
                .IsRequired();

            builder.Property(c => c.CreatedAt)
                .HasColumnName("createdAt")
                .IsRequired();

            builder.Property(c => c.UpdatedAt)
                .HasColumnName("updatedAt")
                .IsRequired();
        }
    }
}
