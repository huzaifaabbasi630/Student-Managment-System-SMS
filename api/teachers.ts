import express from 'express';
import { Teacher, User } from '../models/index.ts';
import { authenticate, authorize } from '../middleware/auth.ts';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('user', '-password');
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { name, email, password, employeeId, subjects, contactNumber } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: 'teacher' });
    await user.save();

    const teacher = new Teacher({
      user: user._id,
      employeeId,
      subjects,
      contactNumber
    });
    await teacher.save();

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
