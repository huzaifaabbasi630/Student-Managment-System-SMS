import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './lib/db.ts';

// Import routes
import authRoutes from './api/auth.ts';
import studentRoutes from './api/students.ts';
import teacherRoutes from './api/teachers.ts';
import classRoutes from './api/classes.ts';
import attendanceRoutes from './api/attendance.ts';
import examRoutes from './api/exams.ts';
import feeRoutes from './api/fees.ts';
import notificationRoutes from './api/notifications.ts';
import adminRoutes from './api/admin.ts';

async function startServer() {
  await connectDB();

  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/students', studentRoutes);
  app.use('/api/teachers', teacherRoutes);
  app.use('/api/classes', classRoutes);
  app.use('/api/attendance', attendanceRoutes);
  app.use('/api/exams', examRoutes);
  app.use('/api/fees', feeRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/admin', adminRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
