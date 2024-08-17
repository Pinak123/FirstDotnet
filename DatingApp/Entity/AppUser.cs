using System.ComponentModel.DataAnnotations;
using DatingApp.Extensions;

namespace DatingApp.Entities;

public class AppUser
    {
        public string  UserName { get; set; }
        
        [Key]
        public int Id { get; set; }

        public byte[] PasswordHash { get; set; } = [] ; 
        public byte[] PasswordHashSalt { get; set; } = [];
        public DateOnly DateBirth { get; set; }
        public required string KnownAs { get; set; } 
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } 
        public required string Gender { get; set; }
        public string? Introduction { get; set; }
        public string? Intrest { get; set; }
        public string? LokingFor { get; set; }
        public required string  City { get; set; }
        public required string Country { get; set; }
        public List<Photo> Photos { get; set; }

        public int GetAge() { 
            return DateBirth.Calculate();
        }

}
