using DatingApp.Data;
using DatingApp.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controller;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpOptions]
    public IActionResult Options()
    {
        Response.Headers.Append("Access-Control-Allow-Origin", "http://localhost:4200");
        Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type");
        return Ok();
    }
    private readonly DataContext _dataContext;

    public UsersController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users =await _dataContext.User.ToListAsync();

        return users;
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetUser(int id )
    {
        return await _dataContext.User.FindAsync(id);
    }
}
