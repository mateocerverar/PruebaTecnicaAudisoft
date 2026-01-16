using AutoMapper;
using Domain.Entities;
using Application.DTOs;

namespace Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Estudiante, EstudianteDTO>().ReverseMap();
        CreateMap<EstudianteCreateDTO, Estudiante>();

        CreateMap<Profesor, ProfesorDTO>().ReverseMap();
        CreateMap<ProfesorCreateDTO, Profesor>();

        CreateMap<Nota, NotaDTO>()
            .ForMember(dest => dest.EstudianteNombre, opt => opt.MapFrom(src => src.Estudiante != null ? src.Estudiante.Nombre : string.Empty))
            .ForMember(dest => dest.ProfesorNombre, opt => opt.MapFrom(src => src.Profesor != null ? src.Profesor.Nombre : string.Empty));
        
        CreateMap<NotaCreateDTO, Nota>();
    }
}
