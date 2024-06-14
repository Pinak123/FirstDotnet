using System.ComponentModel.DataAnnotations;

namespace DatingApp.DTO;

public class RegisterDTO
{
    [Required]
    public string username { get; set; }
    [Required]
    public string password { get; set; }
}
