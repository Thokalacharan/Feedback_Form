# 🚀 Quick Start Guide

## 5-Minute Setup

### 1️⃣ Install Dependencies (1 minute)

```bash
cd smart-feedback-system
npm install
```

### 2️⃣ Start MongoDB (30 seconds)

**Windows:**
- MongoDB should already be running if installed as a service
- Verify by opening MongoDB Compass → should connect automatically
- Or manually start: Search for "MongoDB" in Windows Services and start it

### 3️⃣ Configure Gmail (2 minutes)

1. Get your Gmail and App Password ready
2. Open `.env` file in the project folder
3. Replace:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password-here
   ```

### 4️⃣ Start the Server (1 minute)

```bash
npm start
```

You should see: ✅ MongoDB connected and server running at http://localhost:3000

### 5️⃣ Test It!

- **Feedback Form:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin

---

## What's Included

✅ Complete feedback form with validation  
✅ Automatic email confirmations  
✅ Admin dashboard with filters & statistics  
✅ MongoDB database integration  
✅ Beautiful Tailwind CSS design  
✅ Full API with error handling  

---

## File Locations

- **Feedback Form:** `public/index.html`
- **Admin Page:** `public/admin.html`
- **Server Code:** `server/server.js`
- **Database Setup:** `server/config/database.js`
- **Email Setup:** `server/config/email.js`

---

## Common Issues

**"Cannot connect to MongoDB"**
→ Make sure MongoDB is running (check MongoDB Compass)

**"Email not sending"**
→ Verify EMAIL_USER and EMAIL_PASS in .env are correct

**"Port 3000 in use"**
→ Change PORT to 3001 in .env

---

## Need Help?

See **README.md** for comprehensive documentation!

---

**Ready to go! 🎉**
