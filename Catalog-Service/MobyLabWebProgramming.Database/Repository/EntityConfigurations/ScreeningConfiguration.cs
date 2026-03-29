using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MobyLabWebProgramming.Database.Repository.Entities;
using MobyLabWebProgramming.Database.Repository.Enums;


namespace MobyLabWebProgramming.Database.Repository.EntityConfigurations;

public class ScreeningConfiguration : IEntityTypeConfiguration<Screening>
{
    public void Configure(EntityTypeBuilder<Screening> builder)
    {
        builder.Property(e => e.Id) // This specifies which property is configured.
            .IsRequired(); // Here it is specified if the property is required, meaning it cannot be null in the database.
        builder.HasKey(x => x.Id); // Here it is specified that the property Id is the primary key.
        builder.Property(e => e.StartTime)
            .IsRequired();
        
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();
        
        builder.HasOne(e => e.Movie)
            .WithMany(e => e.Screenings)
            .HasForeignKey(e => e.MovieId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
        
        builder.Property(e => e.ScreenType)
            .HasConversion(new EnumToStringConverter<ScreenEnum>())
            .HasMaxLength(255)
            .IsRequired();
            
        
        builder.HasOne(e => e.Hall)
            .WithMany(e => e.Screenings)
            .HasForeignKey(e => e.HallId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();



    }
}