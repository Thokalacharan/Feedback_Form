# Smart Feedback System - Complete Setup Guide

A full-stack feedback management system similar to Google Forms with MongoDB storage, automated email confirmations, and an admin dashboard.

## 🎯 Features

✅ **Responsive Feedback Form** - Users can submit feedback with form validation  
✅ **Email Confirmations** - Automatic email sent to users after submission  
✅ **MongoDB Database** - All submissions stored in local MongoDB  
✅ **Admin Dashboard** - View, filter, and sort all feedback submissions  
✅ **Beautiful UI** - Built with Tailwind CSS for modern design  
✅ **Real-time Statistics** - Track submission counts and ratings  

---

## 📋 Prerequisites

Before you start, ensure you have the following installed:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (Community Edition) - [Download](https://www.mongodb.com/try/download/community)
3. **MongoDB Compass** (Optional but recommended) - [Download](https://www.mongodb.com/products/compass)
4. **Git** (Optional) - [Download](https://git-scm.com/)
5. **A Gmail Account** - For sending emails via Nodemailer

---

## 🚀 Project Structure

```
smart-feedback-system/
│
├── server/
│   ├── server.js                 # Main server file
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── email.js             # Email configuration
│   ├── models/
│   │   └── Feedback.js          # Mongoose schema
│   └── routes/
│       └── feedback.js          # API routes
│
├── public/
│   ├── index.html               # Feedback form page
│   ├── admin.html               # Admin dashboard
│   ├── css/
│   │   └── styles.css           # Global styles
│   └── js/
│       ├── form.js              # Form validation & submission
│       └── admin.js             # Dashboard functionality
│
├── package.json                 # Dependencies
├── .env                         # Environment variables (LOCAL)
├── .env.example                 # Example environment file
└── README.md                    # This file
```

---

## 🔧 Installation Steps

### Step 1: Navigate to the Project Directory

```bash
cd path/to/smart-feedback-system
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **Express.js** - Web server framework
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email service
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing
- **Body-parser** - Request body parsing

### Step 3: Start MongoDB

#### Option A: MongoDB Running as a Service (Windows)

If MongoDB is installed as a service:

```bash
# MongoDB should start automatically
# Verify it's running by opening MongoDB Compass
# It should connect to mongodb://localhost:27017
```

#### Option B: Start MongoDB Manually (Windows)

```bash
# Find your MongoDB installation directory (usually C:\Program Files\MongoDB\Server\X.X\bin)
# Run mongod.exe from that directory
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod.exe
```

#### Option C: Docker (If Installed)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Verify MongoDB is running:**
- Open MongoDB Compass
- It should connect to `mongodb://localhost:27017`
- You should see the databases list

---

## 📧 Gmail Configuration (Critical Step)

To send emails via Gmail with Nodemailer, follow these steps:

### Option 1: Using Gmail App Password (Recommended)

1. **Enable 2-Factor Authentication on your Gmail account:**
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Click "Security" in the left menu
   - Scroll to "2-Step Verification" and enable it

2. **Generate an App Password:**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows PC" (or your device)
   - Google will generate a 16-character password
   - Copy this password

3. **Update .env file:**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx (the 16-character password, remove spaces if any)
   ```

### Option 2: Using Less Secure Apps (Not Recommended)

If the above doesn't work:
1. Go to [myaccount.google.com/lesssecureapps](https://myaccount.google.com/lesssecureapps)
2. Enable "Less secure app access"
3. Use your regular Gmail password in .env

---

## ⚙️ Environment Configuration

### 1. Create .env File (Already Created - Just Update)

The `.env` file is already created. Update it with your actual values:

```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/smart-feedback

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 2. Verify .env File

- **Location:** Root of the project
- **Important:** Never commit .env file to Git (it's in .gitignore)
- **Format:** KEY=VALUE (no spaces around =)

---

## 🚀 Running the Application

### Start the Server

```bash
npm start
```

You should see:

```
╔════════════════════════════════════════════════════════╗
║   🎉 Smart Feedback System Server Started 🎉          ║
╠════════════════════════════════════════════════════════╣
║   📍 Server running at: http://localhost:3000         ║
║   📋 Feedback Form: http://localhost:3000             ║
║   📊 Admin Dashboard: http://localhost:3000/admin     ║
╠════════════════════════════════════════════════════════╣
║   🗄️  Database: mongodb://127.0.0.1:27017/smart-feedback
║   📧 Email Service: Nodemailer + Gmail SMTP             ║
║   🛠️  Environment: development                          ║
╚════════════════════════════════════════════════════════╝
```

### Development Mode (With Auto-Reload)

```bash
npm run dev
```

This uses **nodemon** to automatically restart the server when files change.

---

## 📱 Accessing the Application

### 1. Feedback Form Page
- **URL:** [http://localhost:3000](http://localhost:3000)
- **Features:**
  - Submit feedback with name, email, event, rating, and message
  - Form validation on the client and server
  - Loading spinner during submission
  - Success/error messages
  - Automatic email confirmation

### 2. Admin Dashboard
- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Features:**
  - View all feedback submissions
  - Filter by event name
  - Filter by rating (1-5 stars)
  - Sort by newest, oldest, highest, or lowest rating
  - Real-time statistics (total, average rating, excellent/poor counts)
  - Pagination (10 items per page)

---

## 🌐 API Endpoints

### POST /api/feedback
**Create new feedback**

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "eventName": "Tech Conference 2024",
  "rating": 5,
  "feedbackMessage": "Great event with excellent speakers!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Feedback submitted successfully!",
  "feedbackId": "507f1f77bcf86cd799439011",
  "emailSent": true
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### GET /api/feedback
**Retrieve all feedback**

**Response:**
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "eventName": "Tech Conference 2024",
      "rating": 5,
      "feedbackMessage": "Great event with excellent speakers!",
      "createdAt": "2024-03-15T10:30:00.000Z"
    },
    ...
  ]
}
```

### GET /api/feedback/:id
**Retrieve single feedback by ID**

**Response:**
```json
{
  "success": true,
  "data": { ...feedback object... }
}
```

---

## 🗄️ MongoDB Schema

### Feedback Collection

```javascript
{
  _id: ObjectId,
  name: String (required, max: 100),
  email: String (required, valid email),
  eventName: String (required, max: 150),
  rating: Number (required, min: 1, max: 5),
  feedbackMessage: String (required, min: 10, max: 1000),
  createdAt: Date (default: current date)
}
```

### View Data in MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select database: `smart-feedback`
4. View collection: `feedbacks`
5. Browse and search feedback documents

---

## 📧 Email Template

Users receive a confirmation email with this format:

```
From: your-email@gmail.com
To: user@example.com
Subject: Thank You for Your Feedback

Hello [Name],

Thank you for taking the time to submit your feedback. We truly value your input.

Here is the feedback you submitted:

Event: [Event Name]
Rating: ⭐⭐⭐⭐⭐ (5/5)
Your Feedback: [Feedback message]

We appreciate your time and valuable feedback. It helps us serve you better!

Best Regards,
Event Team
```

---

## ✨ Key Features Explained

### 1. Form Validation

**Client-side validation** (in browser):
- Required field checks
- Email format validation
- Rating range (1-5)
- Message length (10-1000 characters)
- Real-time character counter

**Server-side validation** (in backend):
- All fields validated before saving
- Email regex validation
- Rating boundary checks
- Prevents invalid data in database

### 2. Email Sending

- Uses **Nodemailer** with Gmail SMTP
- Sends HTML-formatted confirmation emails
- Includes all submitted data in email
- Runs asynchronously (doesn't block form submission)

### 3. Admin Dashboard

**Statistics Panel:**
- Total Submissions
- Average Rating
- Excellent Submissions (5★)
- Needs Work Submissions (1-2★)

**Filters:**
- Search by event name (real-time)
- Filter by rating (1-5 stars)
- Sort by date or rating

**Pagination:**
- 10 items per page
- Previous/Next navigation
- Current page indicator

### 4. Database Operations

- Uses **Mongoose** for schema validation
- Automatic timestamps (createdAt)
- Indexed fields for faster queries
- Error handling for database operations

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Ensure MongoDB is running
   - Windows: Check if `mongod.exe` is running
   - Check MongoDB status in services
2. Verify connection string in .env
3. Default: `mongodb://127.0.0.1:27017/smart-feedback`
4. Restart MongoDB service

### Issue: "Email not sending"

**Solution:**
1. Check Gmail credentials in .env
2. Enable 2FA and use App Password (not regular password)
3. Verify EMAIL_USER and EMAIL_PASS are correct
4. Check email logs in server console
5. Allow "Less secure apps" if using regular password

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in .env
PORT=3001
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Reinstall dependencies
rm node_modules
rm package-lock.json
npm install
```

### Issue: Form submission shows "Network error"

**Solution:**
1. Check server is running (`npm start`)
2. Check browser console for errors (F12)
3. Verify API endpoint URL in form.js
4. Check server logs for errors

---

## 🔐 Security Considerations

### Production Checklist

Before deploying to production:

1. **Never commit .env file** - Keep credentials secret
2. **Use strong passwords** - For Gmail app password
3. **Enable CORS properly** - Restrict to your domain
4. **Use HTTPS** - When deployed online
5. **Add rate limiting** - Prevent spam submissions
6. **Add CAPTCHA** - Optional, prevents bots
7. **Sanitize inputs** - Already done with Mongoose validation
8. **Add authentication** - For admin dashboard access
9. **Backup database** - Regular MongoDB backups
10. **Use environment-specific configs** - Different settings for dev/prod

---

## 📦 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add MongoDB Atlas URL
heroku config:set MONGODB_URI=your_mongodb_atlas_url

# Add email credentials
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password

# Deploy
git push heroku main
```

### Deploy to AWS, DigitalOcean, etc.

Follow their respective documentation, ensuring:
1. Node.js is installed
2. MongoDB URL points to your cloud database
3. Environment variables are configured
4. PORT matches their requirements

---

## 📚 Technologies Used

| Technology | Purpose |
|-----------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| Nodemailer | Email service |
| Tailwind CSS | CSS framework |
| Vanilla JavaScript | Frontend logic |

---

## 📄 License

This project is open source and available for educational and commercial use.

---

## 💡 Tips & Best Practices

1. **Monitor Email Quota** - Gmail has sending limits
2. **Regular Backups** - Export MongoDB data regularly
3. **Clean Old Data** - Archive feedback after some period
4. **Update Dependencies** - Run `npm update` monthly
5. **Monitor Server Logs** - Keep track of errors
6. **Test Email Settings** - Before going live
7. **Use MongoDB Indexes** - For faster queries on large datasets

---

## 🤝 Support

For issues or questions:
1. Check this README thoroughly
2. Review browser console (F12) for errors
3. Check server terminal for error messages
4. Verify .env configuration
5. Ensure MongoDB and server are running

---

## 🎉 Success Indicators

When everything is working correctly:

✅ Server starts without errors  
✅ Feedback form loads at http://localhost:3000  
✅ Admin dashboard loads at http://localhost:3000/admin  
✅ Form submission completes without errors  
✅ Email arrives in your inbox within seconds  
✅ Data appears in admin dashboard  
✅ MongoDB Compass shows feedback documents  
✅ Filters and sorting work in admin dashboard  

---

**Happy Building! 🚀**

If you have suggestions for improvements, feel free to modify and customize this system for your specific needs.
