using System.Collections.ObjectModel;

namespace Domain.Entities;

public class Profesor
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public ICollection<Nota> Notas { get; set; } = new Collection<Nota>();
}
