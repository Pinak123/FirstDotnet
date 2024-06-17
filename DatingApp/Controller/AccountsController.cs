using System.Security.Cryptography;
using System.Text;
using DatingApp.Data;
using DatingApp.DTO;
using DatingApp.Entities;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controller;
[AllowAnonymous]
public class AccountsController:BaseApiController
{
    private readonly ITokenServices _tokenService;
    private readonly DataContext _context;
    public AccountsController(DataContext context , ITokenServices TokenService)
    {
        _tokenService = TokenService;
        _context = context;
    }

    [HttpPost("register")]// api/Account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDTO)
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
        return new UserDto
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPost("Login")]// api/Account/login
    public async Task<ActionResult<UserDto>> Login(LoginDTO loginDTO)
    {
        var user =await _context.User.FirstOrDefaultAsync(x => x.UserName == loginDTO.Username);

        if (user == null) return Unauthorized(user);

        using var hmac = new HMACSHA512(user.PasswordHashSalt);
        var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

        for (int i =0 ; i< ComputeHash.Length ; i++)
        {
            if (ComputeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password!!");
        };

        return new UserDto
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };

    }
    private async Task<bool> UserExists(RegisterDTO username)
    {
        return await _context.User.AnyAsync(x => x.UserName.ToLower() == username.username.ToLower());
    }
    
}
