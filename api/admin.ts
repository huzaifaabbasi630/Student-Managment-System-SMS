import express from 'express';
import { User } from '../models/index.ts';
import { authenticate, authorize } from '../middleware/auth.ts';

const router = express.Router();

// Get all pending users
router.get('/pending-users', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false }).select('-password');
    res.json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve or reject user
router.post('/approve-user', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { userId, action } = req.body; // action: 'approve' or 'reject'
    
    if (action === 'approve') {
      const user = await User.findByIdAndUpdate(userId, { isApproved: true }, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      // Mock Notification (WhatsApp/Email)
      console.log(`Sending approval notification to ${user.email} via Email/WhatsApp...`);
      // In a real app, you would use Twilio or SendGrid here
      
      res.json({ message: 'User approved successfully' });
    } else {
      const user = await User.findByIdAndDelete(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User request rejected and deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
