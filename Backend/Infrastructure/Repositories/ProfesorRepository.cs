using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories;

public class ProfesorRepository : BaseRepository<Profesor>, IProfesorRepository
{
    public ProfesorRepository(AudiSoftContext context) : base(context) { }
}
