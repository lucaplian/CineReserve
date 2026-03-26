using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Database.Repository.Entities;

namespace MobyLabWebProgramming.Database.Repository.EntityConfigurations;

public class FeedbackConfiguration : IEntityTypeConfiguration<Feedback>
{
    public void Configure(EntityTypeBuilder<Feedback> builder)
    {

        builder.Property(e => e.Id) // This specifies which property is configured.
            .IsRequired(); // Here it is specified if the property is required, meaning it cannot be null in the database.
        builder.HasKey(x => x.Id); // Here it is specified that the property Id is the primary key.
        builder.Property(e => e.Rating)
            .IsRequired();
        builder.Property(e => e.Comment)
            .HasMaxLength(4095)
            .IsRequired();
        
        builder.Property(e => e.WouldRecommend)
            .IsRequired(false); 
        
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();
        
        builder.HasOne(e => e.User)
            .WithMany(e => e.Feedbacks)
            .HasForeignKey(e => e.UserId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(e => e.Movie)
            .WithMany(e => e.Feedbacks)
            .HasForeignKey(e => e.MovieId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);



    }
}