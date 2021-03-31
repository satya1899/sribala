using ExamProject.Models;
using ExamProject.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly IDataRepository<Exam> _dataRepository;
        public ExamController(IDataRepository<Exam> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        // GET: api/Employee
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Exam> exams = _dataRepository.GetAll();
            return Ok(exams);
        }
        // GET: api/Employee/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(long id)
        {
            Exam exam = _dataRepository.Get(id);
            if (exam == null)
            {
                return NotFound("The exam record couldn't be found.");
            }
            return Ok(exam);
        }
        // POST: api/Employee
        [HttpPost]
        public IActionResult Post([FromBody] Exam exam)
        {
            if (exam == null)
            {
                return BadRequest("Exam is null.");
            }
            _dataRepository.Add(exam);
            return CreatedAtRoute(
                  "Get",
                  new { Id = exam.Id },
                  exam);
        }
        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Exam exam)
        {
            if (exam == null)
            {
                return BadRequest("Exam is null.");
            }
            Exam examToUpdate = _dataRepository.Get(id);
            if (examToUpdate == null)
            {
                return NotFound("The Exam record couldn't be found.");
            }
            _dataRepository.Update(examToUpdate, exam);
            return NoContent();
        }
        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Exam exam = _dataRepository.Get(id);
            if (exam == null)
            {
                return NotFound("The Exam record couldn't be found.");
            }
            _dataRepository.Delete(exam);
            return NoContent();
        }
    }
}
