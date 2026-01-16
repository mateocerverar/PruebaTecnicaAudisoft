namespace Domain.Entities;

public class Nota
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    
    public Guid EstudianteId { get; set; }
    public Estudiante? Estudiante { get; set; }
    
    public Guid ProfesorId { get; set; }
    public Profesor? Profesor { get; set; }
}
