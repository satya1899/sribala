using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamProject.Models
{
    public class ExamContext : DbContext
    {
        
            public ExamContext(DbContextOptions options)
                : base(options)
            {
            }
            public DbSet<Exam> Exams { get; set; }
        }
}
