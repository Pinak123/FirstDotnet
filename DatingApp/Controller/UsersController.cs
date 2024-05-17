﻿using DatingApp.Data;
using DatingApp.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controller;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
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
