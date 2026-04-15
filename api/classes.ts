import express from 'express';
import { Class, Section } from '../models/index.ts';
import { authenticate, authorize } from '../middleware/auth.ts';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { name, teacherId } = req.body;
    const newClass = new Class({ name, teacher: teacherId });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:classId/sections', authenticate, async (req, res) => {
  try {
    const sections = await Section.find({ class: req.params.classId });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/sections', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { name, classId } = req.body;
    const section = new Section({ name, class: classId });
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
