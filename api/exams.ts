import express from 'express';
import { Exam, Result } from '../models/index.ts';
import { authenticate, authorize } from '../middleware/auth.ts';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const exams = await Exam.find().populate('class');
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authenticate, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/results', authenticate, async (req, res) => {
  try {
    const { studentId, examId } = req.query;
    let query: any = {};
    if (studentId) query.student = studentId;
    if (examId) query.exam = examId;

    const results = await Result.find(query as any).populate('student').populate('exam');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/results', authenticate, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const { examId, studentId, marks } = req.body;
    
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    let totalObtained = 0;
    let totalMax = 0;
    marks.forEach((m: any) => {
      totalObtained += m.obtained;
      const subject = exam.subjects.find((s: any) => s.name === m.subject);
      totalMax += subject ? subject.maxMarks : 100;
    });

    const percentage = (totalObtained / totalMax) * 100;
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    const result = new Result({
      exam: examId,
      student: studentId,
      marks,
      totalMarks: totalObtained,
      percentage,
      grade
    });
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
