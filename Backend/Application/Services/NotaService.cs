using AutoMapper;
using Application.DTOs;
using Application.Interfaces;
using Application.Exceptions;
using Domain.Entities;

namespace Application.Services;

public class NotaService : INotaService
{
    private readonly INotaRepository _repository;
    private readonly IMapper _mapper;

    public NotaService(INotaRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<NotaDTO>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<NotaDTO>>(entities);
    }

    public async Task<NotaDTO?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return _mapper.Map<NotaDTO>(entity);
    }

    public async Task<NotaDTO> CreateAsync(NotaCreateDTO createDto)
    {
        if (createDto.Valor < 0 || createDto.Valor > 5)
        {
            throw new BusinessRuleException("El valor de la nota debe estar entre 0.0 y 5.0");
        }

        var entity = _mapper.Map<Nota>(createDto);
        entity.Id = Guid.NewGuid();
        var created = await _repository.AddAsync(entity);
        return _mapper.Map<NotaDTO>(created);
    }

    public async Task UpdateAsync(Guid id, NotaCreateDTO updateDto)
    {
         if (updateDto.Valor < 0 || updateDto.Valor > 5)
        {
            throw new BusinessRuleException("El valor de la nota debe estar entre 0.0 y 5.0");
        }

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
