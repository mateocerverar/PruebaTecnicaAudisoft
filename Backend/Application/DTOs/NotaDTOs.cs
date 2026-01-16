namespace Application.DTOs;

public class NotaDTO
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public Guid EstudianteId { get; set; }
    public string EstudianteNombre { get; set; } = string.Empty;
    public Guid ProfesorId { get; set; }
    public string ProfesorNombre { get; set; } = string.Empty;
}

public class NotaCreateDTO
{
    public string Nombre { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public Guid EstudianteId { get; set; }
    public Guid ProfesorId { get; set; }
}
