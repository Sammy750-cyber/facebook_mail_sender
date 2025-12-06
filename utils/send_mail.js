import nodemailer from "nodemailer";
import dotenv from "dotenv";
// import generateOTP from "./generateOTP.js";
dotenv.config();

// Send OTP Email
export default async function sendEmail(toEmail, template_page) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${template_page.from}`,
    to: toEmail,
    subject: `${template_page.subject}`,
    prority: `${template_page.prority}`,
    replyto: `${template_page.replyto}`,
    html: `${template_page.html}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return "Email sent successfully"
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send Mail");
  }
}
