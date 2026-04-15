import express from 'express';
import { Student, User, Class, Section } from '../models/index.ts';
import { authenticate, authorize } from '../middleware/auth.ts';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Get all students
router.get('/', authenticate, async (req, res) => {
  try {
    const students = await Student.find().populate('user', '-password').populate('class').populate('section');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add student (Admin only)
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { name, email, password, rollNumber, classId, sectionId, parentName, contactNumber, address, dateOfBirth } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: 'student' });
    await user.save();

    const student = new Student({
      user: user._id,
      rollNumber,
      class: classId,
      section: sectionId,
      parentName,
      contactNumber,
      address,
      dateOfBirth
    });
    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update student
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete student
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await User.findByIdAndDelete(student.user);
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
