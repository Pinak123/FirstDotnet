using System;

namespace DatingApp.Extensions;

public static class DateTimeCalc
{
    public static int Calculate(this DateOnly dob)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var age = today.Year - dob.Year;
        if (dob > today.AddYears(-age)) age-- ;

        return age;
    }
}
