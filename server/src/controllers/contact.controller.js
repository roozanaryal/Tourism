import nodemailer from "nodemailer";

export const sendContactEmail = async (req, res) => {
  // Debug: Check if credentials are loaded
  if (!process.env.CONTACT_EMAIL_USER || !process.env.CONTACT_EMAIL_PASS) {
    console.error('Missing CONTACT_EMAIL_USER or CONTACT_EMAIL_PASS environment variables.');
    return res.status(500).json({ error: 'Email credentials are not configured on the server.' });
  }

  // Create transporter inside the function to ensure env vars are loaded
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CONTACT_EMAIL_USER,
      pass: process.env.CONTACT_EMAIL_PASS,
    },
  });

  const { firstName, lastName, address, phone, email, message } = req.body;
  if (!firstName || !lastName || !address || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL_USER,
      to: process.env.CONTACT_EMAIL_RECEIVER || process.env.CONTACT_EMAIL_USER,
      subject: 'New Contact Form Submission',
      text: `Contact Details:\n\nName: ${firstName} ${lastName}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact email error:', error);
    return res.status(500).json({ error: 'Failed to send contact email' });
  }
};
