using ExamProject.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamProject.Models.DataManager
{
    public class ExamManager:IDataRepository<Exam>
    {
        readonly ExamContext _ExamContext;
        public ExamManager(ExamContext context)
        {
            _ExamContext = context;
        }
        public IEnumerable<Exam> GetAll()
        {
            return _ExamContext.Exams.ToList();
        }
        public Exam Get(long id)
        {
            return _ExamContext.Exams
                  .FirstOrDefault(e => e.Id == id);
        }
        public void Add(Exam entity)
        {
            _ExamContext.Exams.Add(entity);
            _ExamContext.SaveChanges();
        }
        public void Update(Exam exam, Exam entity)
        {
            exam.Id = entity.Id;
            exam.Description = entity.Description;
            exam.IsDone = entity.IsDone;
            
            _ExamContext.SaveChanges();
        }
        public void Delete(Exam exam)
        {
            _ExamContext.Exams.Remove(exam);
            _ExamContext.SaveChanges();
        }
    }
}
