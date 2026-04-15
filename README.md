# SMS Pro - Student Management System

A production-ready Student Management System built with React, Express, MongoDB, and Expo.

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB instance (Atlas recommended)
- Expo Go app on your mobile device

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Installation
```bash
npm install
```

### 4. Seeding Data
Run the seed script to create initial users:
```bash
npx tsx seed.ts
```

### 5. Running the App
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### 6. Mobile App (Expo)
Navigate to the `/mobile` directory:
```bash
cd mobile
npm install
npx expo start
```
Scan the QR code with Expo Go to view the app on your phone.

## 🛠 Tech Stack
- **Frontend:** React, Tailwind CSS, shadcn/ui, Axios
- **Backend:** Node.js, Express, JWT, Mongoose
- **Mobile:** React Native, Expo Router
- **Database:** MongoDB

## 🔐 Credentials (After Seeding)
- **Admin:** admin@sms.com / admin123
- **Teacher:** teacher@sms.com / teacher123
- **Student:** student@sms.com / student123
