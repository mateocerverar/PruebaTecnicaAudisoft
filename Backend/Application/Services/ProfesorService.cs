using AutoMapper;
using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class ProfesorService : IProfesorService
{
    private readonly IProfesorRepository _repository;
    private readonly IMapper _mapper;

    public ProfesorService(IProfesorRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProfesorDTO>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ProfesorDTO>>(entities);
    }

    public async Task<ProfesorDTO?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return _mapper.Map<ProfesorDTO>(entity);
    }

    public async Task<ProfesorDTO> CreateAsync(ProfesorCreateDTO createDto)
    {
        var entity = _mapper.Map<Profesor>(createDto);
        entity.Id = Guid.NewGuid();
        var created = await _repository.AddAsync(entity);
        return _mapper.Map<ProfesorDTO>(created);
    }

    public async Task UpdateAsync(Guid id, ProfesorCreateDTO updateDto)
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
