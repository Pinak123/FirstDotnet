using System.Security.Cryptography;
using System.Text;
using DatingApp.Data;
using DatingApp.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Controller;

public class AccountsController:BaseApiController
{
    private readonly DataContext _context;
    public AccountsController(DataContext context)
    {
        _context = context;
    }

    [HttpPost("register")]// api/Account/register
    public async Task<ActionResult<AppUser>> Register(string username , string password)
    {
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            UserName = username,
            PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
            PasswordHashSalt = hmac.Key

        };
        _context.User.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
    
}
