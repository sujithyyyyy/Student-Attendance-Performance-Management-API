
# Student Attendance & Performance Management API

A robust backend system to manage students, teachers, subjects, attendance records, and academic performance data.

## Features

- **Authentication**: JWT-based auth with Role-Based Access Control (Admin, Teacher, Student).
- **Student Management**: CRUD operations, search, filter, and pagination.
- **Teacher Management**: CRUD operations for teachers.
- **Attendance**: Mark and update attendance, view by class or student.
- **Marks**: Record and view student marks.
- **Reports**: Attendance summary, top performers, and dashboard statistics.
- **File Upload**: Image upload using Multer and Cloudinary.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Cloudinary (File Upload)

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```
4.  Run the server:
    ```bash
    npm run dev
    ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

### Students
- `POST /api/students` - Create student (Admin/Teacher)
- `GET /api/students` - Get all students (with search, filter, pagination)
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student (Admin/Teacher)
- `DELETE /api/students/:id` - Delete student (Admin)

### Teachers
- `POST /api/teachers` - Create teacher (Admin)
- `GET /api/teachers` - Get all teachers
- `PUT /api/teachers/:id` - Update teacher (Admin)
- `DELETE /api/teachers/:id` - Delete teacher (Admin)

### Attendance
- `POST /api/attendance/mark` - Mark attendance (Admin/Teacher)
- `PUT /api/attendance/update/:id` - Update attendance record (Admin/Teacher)
- `GET /api/attendance/class/:className` - Get attendance by class
- `GET /api/attendance/student/:studentId` - Get attendance by student

### Marks
- `POST /api/marks` - Add marks (Admin/Teacher)
- `GET /api/marks/student/:studentId` - Get marks by student

### Reports
- `GET /api/reports/attendance-summary` - Get attendance summary
- `GET /api/reports/top-performers` - Get top 5 performing students
- `GET /api/reports/dashboard-summary` - Get dashboard stats (Admin)

### Upload
- `POST /api/upload` - Upload an image

