import express from 'express';
import { Attendance } from '../models/index.ts';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.ts';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const { studentId, date, classId } = req.query;
    let query: any = {};
    if (studentId) query.student = studentId;
    if (date) query.date = new Date(date as string);
    
    const attendance = await Attendance.find(query as any).populate('student');
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/mark', authenticate, authorize(['admin', 'teacher']), async (req: AuthRequest, res) => {
  try {
    const { studentId, date, status } = req.body;
    const attendance = await Attendance.findOneAndUpdate(
      { student: studentId, date: new Date(date) },
      { status, markedBy: req.user?.id },
      { upsert: true, new: true }
    );
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
