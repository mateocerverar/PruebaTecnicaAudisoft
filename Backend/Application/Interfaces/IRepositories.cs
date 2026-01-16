using Domain.Entities;

namespace Application.Interfaces;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(Guid id);
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
}

public interface IEstudianteRepository : IRepository<Estudiante> { }
public interface IProfesorRepository : IRepository<Profesor> { }
public interface INotaRepository : IRepository<Nota> { }
