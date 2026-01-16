using AutoMapper;
using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class EstudianteService : IEstudianteService
{
    private readonly IEstudianteRepository _repository;
    private readonly IMapper _mapper;

    public EstudianteService(IEstudianteRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<EstudianteDTO>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<EstudianteDTO>>(entities);
    }

    public async Task<EstudianteDTO?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return _mapper.Map<EstudianteDTO>(entity);
    }

    public async Task<EstudianteDTO> CreateAsync(EstudianteCreateDTO createDto)
    {
        var entity = _mapper.Map<Estudiante>(createDto);
        entity.Id = Guid.NewGuid();
        var created = await _repository.AddAsync(entity);
        return _mapper.Map<EstudianteDTO>(created);
    }

    public async Task UpdateAsync(Guid id, EstudianteCreateDTO updateDto)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity != null)
        {
            _mapper.Map(updateDto, entity);
            await _repository.UpdateAsync(entity);
        }
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }
}
