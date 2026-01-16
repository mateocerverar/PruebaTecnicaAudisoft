using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class NotaRepository : BaseRepository<Nota>, INotaRepository
{
    public NotaRepository(AudiSoftContext context) : base(context) { }

    public new async Task<IEnumerable<Nota>> GetAllAsync()
    {
        return await _context.Notas
            .Include(n => n.Estudiante)
            .Include(n => n.Profesor)
            .ToListAsync();
    }
    
    public new async Task<Nota?> GetByIdAsync(Guid id)
    {
         return await _context.Notas
            .Include(n => n.Estudiante)
            .Include(n => n.Profesor)
            .FirstOrDefaultAsync(n => n.Id == id);
    }
}
