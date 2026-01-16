using Application.DTOs;

namespace Application.Interfaces;

public interface IService<T, TCreate>
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(Guid id);
    Task<T> CreateAsync(TCreate createDto);
    Task UpdateAsync(Guid id, TCreate updateDto);
    Task DeleteAsync(Guid id);
}

public interface IEstudianteService : IService<EstudianteDTO, EstudianteCreateDTO> { }
public interface IProfesorService : IService<ProfesorDTO, ProfesorCreateDTO> { }
public interface INotaService : IService<NotaDTO, NotaCreateDTO> { }
