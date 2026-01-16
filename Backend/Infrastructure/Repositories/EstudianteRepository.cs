using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories;

public class EstudianteRepository : BaseRepository<Estudiante>, IEstudianteRepository
{
    public EstudianteRepository(AudiSoftContext context) : base(context) { }
}
