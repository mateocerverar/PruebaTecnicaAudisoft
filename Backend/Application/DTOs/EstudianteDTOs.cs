namespace Application.DTOs;

public class EstudianteDTO
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
}

public class EstudianteCreateDTO
{
    public string Nombre { get; set; } = string.Empty;
}
