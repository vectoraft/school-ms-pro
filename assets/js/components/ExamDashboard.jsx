import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ExamDashboard() {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wp-json/schoolms/v1/exam/list', { params: { class_id: 1 } })
      .then(res => setExams(res.data)).finally(() => setLoading(false));
  }, []);

  const handleExamSelect = (examId) => {
    setSelectedExam(examId);
    setLoading(true);
    axios.get('/wp-json/schoolms/v1/exam/results', { params: { exam_id: examId } })
      .then(res => setResults(res.data)).finally(() => setLoading(false));
  };

  return (
    <div className="dashboard-widget exam-dashboard">
      <h3>Exam Analytics</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <h4>Exams</h4>
          <ul>
            {exams.map(exam => (
              <li key={exam.id}>
                <button onClick={() => handleExamSelect(exam.id)}>{exam.title} ({exam.date})</button>
              </li>
            ))}
          </ul>
          {selectedExam && (
            <>
              <h4>Results</h4>
              <table className="table table-sm">
                <thead><tr><th>Student ID</th><th>Marks</th></tr></thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i}><td>{r.student_id}</td><td>{r.marks}</td></tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
}
