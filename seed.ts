import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, Student, Teacher, Class, Section } from './models/index.ts';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sms';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Class.deleteMany({});
    await Section.deleteMany({});

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const teacherPassword = await bcrypt.hash('teacher123', 10);
    const studentPassword = await bcrypt.hash('student123', 10);

    // Create Admin
    const admin = new User({
      name: 'System Admin',
      email: 'admin@sms.com',
      password: hashedPassword,
      role: 'admin',
      isApproved: true
    });
    await admin.save();

    // Create Teacher
    const teacherUser = new User({
      name: 'John Teacher',
      email: 'teacher@sms.com',
      password: teacherPassword,
      role: 'teacher',
      isApproved: true
    });
    await teacherUser.save();

    const teacher = new Teacher({
      user: teacherUser._id,
      employeeId: 'T001',
      subjects: ['Mathematics', 'Physics']
    });
    await teacher.save();

    // Create Class & Section
    const classA = new Class({ name: 'Grade 10', teacher: teacher._id });
    await classA.save();

    const sectionA = new Section({ name: 'Section A', class: classA._id });
    await sectionA.save();

    // Create Student
    const studentUser = new User({
      name: 'Jane Student',
      email: 'student@sms.com',
      password: studentPassword,
      role: 'student',
      isApproved: true
    });
    await studentUser.save();

    const student = new Student({
      user: studentUser._id,
      rollNumber: 'S001',
      class: classA._id,
      section: sectionA._id,
      parentName: 'Robert Student'
    });
    await student.save();

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
