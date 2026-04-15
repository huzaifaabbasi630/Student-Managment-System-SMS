import express from 'express';
import { Notification } from '../models/index.ts';
import { authenticate, authorize } from '../middleware/auth.ts';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const notifications = await Notification.find({
      $or: [{ recipient: userId }, { recipient: null }]
    } as any).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
