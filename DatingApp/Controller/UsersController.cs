using DatingApp.Data;
using DatingApp.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controller;
[Authorize]
public class UsersController : BaseApiController
{
    
    private readonly DataContext _dataContext;

    public UsersController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users =await _dataContext.User.ToListAsync();

        return users;
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetUser(int id )
    {
        return await _dataContext.User.FindAsync(id);
    }
}
