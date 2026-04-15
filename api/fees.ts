import express from 'express';
import { Fee } from '../models/index.ts';
import { authenticate, authorize } from '../middleware/auth.ts';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const { studentId } = req.query;
    let query: any = {};
    if (studentId) query.student = studentId;

    const fees = await Fee.find(query as any).populate('student');
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).json(fee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/pay', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      { status: 'paid', paidDate: new Date() },
      { new: true }
    );
    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
