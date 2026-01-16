using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AudiSoftContext : DbContext
{
    public AudiSoftContext(DbContextOptions<AudiSoftContext> options) : base(options) { }

    public DbSet<Estudiante> Estudiantes => Set<Estudiante>();
    public DbSet<Profesor> Profesores => Set<Profesor>();
    public DbSet<Nota> Notas => Set<Nota>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Estudiante
        modelBuilder.Entity<Estudiante>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
            entity.HasMany(e => e.Notas)
                  .WithOne(n => n.Estudiante)
                  .HasForeignKey(n => n.EstudianteId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // Profesor
        modelBuilder.Entity<Profesor>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Nombre).IsRequired().HasMaxLength(100);
            entity.HasMany(p => p.Notas)
                  .WithOne(n => n.Profesor)
                  .HasForeignKey(n => n.ProfesorId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // Nota
        modelBuilder.Entity<Nota>(entity =>
        {
            entity.HasKey(n => n.Id);
            entity.Property(n => n.Nombre).IsRequired().HasMaxLength(100);
            entity.Property(n => n.Valor).HasColumnType("decimal(4,2)").IsRequired();
        });
    }
}
