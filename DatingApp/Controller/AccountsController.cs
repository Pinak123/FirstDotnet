using System.Security.Cryptography;
using System.Text;
using DatingApp.Data;
using DatingApp.DTO;
using DatingApp.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controller;

public class AccountsController:BaseApiController
{
    private readonly DataContext _context;
    public AccountsController(DataContext context)
    {
        _context = context;
    }

    [HttpPost("register")]// api/Account/register
    public async Task<ActionResult<RegisterDTO>> Register(RegisterDTO registerDTO)
    {
        if (await UserExists(registerDTO))
        {
            return BadRequest("Username is taken");
        };

        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            UserName = registerDTO.username.ToLower(),
            PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.password)),
            PasswordHashSalt = hmac.Key

        };
        _context.User.Add(user);
        await _context.SaveChangesAsync();
        return registerDTO;
    }
    private async Task<bool> UserExists(RegisterDTO username)
    {
        return await _context.User.AnyAsync(x => x.UserName.ToLower() == username.username.ToLower());
    }
    
}
