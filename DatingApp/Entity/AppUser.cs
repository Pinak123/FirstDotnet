    using System.ComponentModel.DataAnnotations;

    namespace DatingApp.Entities;

    public class AppUser
    {
    
        public string  UserName { get; set; }
        
        [Key]
        public int Id { get; set; }

    }
