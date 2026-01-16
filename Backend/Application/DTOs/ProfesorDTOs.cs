namespace Application.DTOs;

public class ProfesorDTO
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
}

public class ProfesorCreateDTO
{
    public string Nombre { get; set; } = string.Empty;
}
