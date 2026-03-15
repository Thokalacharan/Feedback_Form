const nodemailer = require('nodemailer');

const createEmailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  return transporter;
};

const sendFeedbackConfirmationEmail = async (feedbackData) => {
  try {
    const transporter = createEmailTransporter();

    const emailHTML = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #2c3e50; margin-bottom: 20px;">Thank You for Your Feedback! 🎉</h1>
          
          <p style="color: #555; font-size: 16px; margin-bottom: 20px;">
            Hello <strong>${feedbackData.name}</strong>,
          </p>
          
          <p style="color: #555; font-size: 16px; margin-bottom: 20px;">
            Thank you for taking the time to submit your feedback. We truly value your input and will use it to improve our services.
          </p>

          <div style="background-color: #f0f8ff; border-left: 4px solid #3498db; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <p style="color: #2c3e50; font-weight: bold; margin-bottom: 10px;">Here is the feedback you submitted:</p>
            <p style="color: #555; margin: 10px 0;"><strong>Event:</strong> ${feedbackData.eventName}</p>
            <p style="color: #555; margin: 10px 0;"><strong>Rating:</strong> ${'⭐'.repeat(feedbackData.rating)} (${feedbackData.rating}/5)</p>
            <p style="color: #555; margin: 10px 0;"><strong>Your Feedback:</strong></p>
            <p style="color: #555; margin: 10px 0; padding: 10px; background-color: white; border-radius: 4px;">${feedbackData.feedbackMessage}</p>
          </div>

          <p style="color: #555; font-size: 16px; margin-bottom: 10px;">
            We appreciate your time and valuable feedback. It helps us serve you better!
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #888; font-size: 14px; text-align: center;">
            Best Regards,<br>
            <strong>Event Team</strong>
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: feedbackData.email,
      subject: 'Thank You for Your Feedback',
      html: emailHTML
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return false;
  }
};

module.exports = {
  createEmailTransporter,
  sendFeedbackConfirmationEmail
};
