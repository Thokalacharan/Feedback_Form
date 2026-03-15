# 📁 Project Structure Reference

## Complete File Listing

```
smart-feedback-system/
├── 📄 package.json              ✅ Dependencies and scripts
├── 📄 .env                      ✅ Environment variables (UPDATE WITH YOUR VALUES)
├── 📄 .env.example              ✅ Example environment template
├── 📄 .gitignore                ✅ Git ignore rules
├── 📄 README.md                 ✅ Comprehensive documentation
├── 📄 QUICKSTART.md             ✅ Quick start guide
├── 📄 PROJECT-STRUCTURE.md      ✅ This file
│
├── 📁 server/
│   ├── 📄 server.js             ✅ Main Express server
│   │
│   ├── 📁 config/
│   │   ├── 📄 database.js       ✅ MongoDB connection setup
│   │   └── 📄 email.js          ✅ Nodemailer email configuration
│   │
│   ├── 📁 models/
│   │   └── 📄 Feedback.js       ✅ Mongoose schema and validation
│   │
│   └── 📁 routes/
│       └── 📄 feedback.js       ✅ API endpoints (POST, GET)
│
└── 📁 public/
    ├── 📄 index.html            ✅ Feedback form page
    ├── 📄 admin.html            ✅ Admin dashboard page
    │
    ├── 📁 css/
    │   └── 📄 styles.css        ✅ Global styles and animations
    │
    └── 📁 js/
        ├── 📄 form.js           ✅ Form validation and submission
        └── 📄 admin.js          ✅ Dashboard functionality and filtering
```

## ✅ What's Included

### Backend (Node.js + Express)

| File | Purpose |
|------|---------|
| `server/server.js` | Express app, routes setup, MongoDB connection |
| `server/config/database.js` | MongoDB connection with error handling |
| `server/config/email.js` | Nodemailer Gmail SMTP configuration |
| `server/models/Feedback.js` | Mongoose schema with validation |
| `server/routes/feedback.js` | POST and GET API endpoints |

### Frontend (HTML + CSS + JavaScript)

| File | Purpose |
|------|---------|
| `public/index.html` | Feedback submission form |
| `public/admin.html` | Admin dashboard with statistics |
| `public/css/styles.css` | Styling and animations |
| `public/js/form.js` | Form validation and submission logic |
| `public/js/admin.js` | Dashboard data loading and filtering |

### Configuration

| File | Purpose |
|------|---------|
| `package.json` | Dependencies: express, mongoose, nodemailer, dotenv, cors |
| `.env` | Environment variables (DATABASE_URI, EMAIL credentials) |
| `.env.example` | Template for .env file |
| `.gitignore` | Prevents .env and node_modules from Git |

### Documentation

| File | Purpose |
|------|---------|
| `README.md` | Complete setup and usage guide (20+ sections) |
| `QUICKSTART.md` | 5-minute quick start guide |
| `PROJECT-STRUCTURE.md` | This file |

---

## 🎯 Key Features

### Form Submission Flow

```
User submits form on index.html
        ↓
form.js validates data (client-side)
        ↓
POST to /api/feedback (API call)
        ↓
feedback.js validates again (server-side)
        ↓
Save to MongoDB via Mongoose
        ↓
Send confirmation email via Nodemailer
        ↓
Return success response
        ↓
Show success message to user
```

### Admin Dashboard Flow

```
User visits /admin
        ↓
admin.js loads all feedback via GET /api/feedback
        ↓
Calculate statistics (total, average, excellent, poor)
        ↓
Display in table with filtering options
        ↓
User applies filters/sorts
        ↓
JavaScript filters data in real-time
        ↓
Pagination shows 10 items per page
```

### Email Flow

```
Form submitted
        ↓
Validate email address
        ↓
Create HTML email with submitted data
        ↓
Use Nodemailer to send via Gmail SMTP
        ↓
Log result (success or error)
        ↓
Email arrives in user's inbox
```

---

## 📝 File Details

### server.js
- **Lines:** ~80
- **Imports:** Express, CORS, body-parser, database, routes
- **Middleware:** CORS, JSON parsing, static file serving
- **Routes:** GET / (form), GET /admin (dashboard), /api/feedback (API)
- **Error handling:** 404 and 500 handlers

### Feedback.js (Schema)
- **Validation:** All fields required
- **Fields:** name, email, eventName, rating, feedbackMessage, createdAt
- **Constraints:** Email regex, rating 1-5, message length 10-1000 chars
- **Timestamps:** Automatic createdAt

### feedback.js (Routes)
- **POST /api/feedback** - Create feedback, validate, save, send email
- **GET /api/feedback** - Return all feedback sorted by date
- **GET /api/feedback/:id** - Get single feedback by ID

### form.js
- **Functions:** validateForm, showFieldError, showSuccessMessage, showErrorMessage
- **Validation:** Name, email, event, rating, message
- **Submission:** Fetch POST to API, handle response
- **Features:** Loading spinner, character counter, error messages

### admin.js
- **Functions:** loadFeedback, applyFilters, applySort, renderTable
- **Features:** Real-time filtering, sorting, pagination
- **Stats:** Total count, average rating, excellent/poor counts
- **Pagination:** 10 items per page with prev/next navigation

---

## 🔧 Environment Variables

```env
MONGODB_URI=mongodb://127.0.0.1:27017/smart-feedback
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
NODE_ENV=development
```

---

## 🚀 Getting Started

1. **Install:** `npm install`
2. **Configure:** Update `.env` with your MongoDB and Gmail details
3. **Run:** `npm start`
4. **Test:** Visit http://localhost:3000

---

## 📊 Database

### Collection: `feedbacks`

```
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  eventName: "Tech Conference 2024",
  rating: 5,
  feedbackMessage: "Excellent event...",
  createdAt: 2024-03-15T10:30:00Z
}
```

### View in MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to `smart-feedback` database
4. View `feedbacks` collection

---

## 📧 Email Template

```
From: your-email@gmail.com
Subject: Thank You for Your Feedback
Content: HTML-formatted with user's submitted data
```

---

## 🎨 Styling

- **Framework:** Tailwind CSS (via CDN)
- **Colors:** Blue primary, green success, red error, yellow warning
- **Features:** Responsive design, hover effects, animations
- **Mobile:** Full responsive for tablets and phones

---

## 🔐 Security Features

✅ Input validation (client & server)  
✅ Email validation  
✅ Rating boundary checks  
✅ Message length limits  
✅ Environment variables for secrets  
✅ Mongoose schema validation  
✅ Error handling without exposing internals  

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",        - Web framework
  "mongoose": "^7.0.3",        - MongoDB ODM
  "nodemailer": "^6.9.1",      - Email service
  "dotenv": "^16.0.3",         - Environment variables
  "cors": "^2.8.5",            - Cross-Origin Resource Sharing
  "body-parser": "^1.20.2"     - Request body parsing
}
```

---

## 🎯 API Documentation

### POST /api/feedback

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "eventName": "Event Name",
  "rating": 5,
  "feedbackMessage": "Great experience!"
}
```

Response:
```json
{
  "success": true,
  "message": "Feedback submitted successfully!",
  "feedbackId": "507f1f77bcf86cd799439011",
  "emailSent": true
}
```

### GET /api/feedback

Response:
```json
{
  "success": true,
  "count": 10,
  "data": [
    { feedback object... },
    ...
  ]
}
```

---

## 🎓 Educational Value

This project demonstrates:

- **Node.js & Express** - Server-side JavaScript
- **MongoDB & Mongoose** - NoSQL database with validation
- **REST API** - CRUD operations
- **Frontend Validation** - Client-side form validation
- **Email Integration** - Nodemailer SMTP
- **Environment Configuration** - dotenv for secrets
- **Error Handling** - Try-catch, validation messages
- **Responsive Design** - Tailwind CSS
- **JavaScript DOM** - Form submission, table rendering
- **Real-time Filtering** - JavaScript array methods
- **Pagination** - Data pagination logic

---

**All files are ready to use! Start with QUICKSTART.md or README.md** 🚀
