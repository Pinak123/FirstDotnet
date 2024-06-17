using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using DatingApp.Entities;
using DatingApp.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.Services
{
    public class TokenService : ITokenServices
    {
        private readonly byte[] _key;

        public TokenService(IConfiguration config)
        {
            _key = new byte[64]; // 64 bytes = 512 bits
            _key = Encoding.UTF8.GetBytes(config["Tokenkey"]);
           
            // using (var rng = RandomNumberGenerator.Create())
            // {
            //     rng.GetBytes(_key);
            // }

        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            var key = new SymmetricSecurityKey(_key);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}
