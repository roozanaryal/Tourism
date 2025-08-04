import nodemailer from "nodemailer";
// Configure your transporter (use environment variables for sensitive info in production)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.CONTACT_EMAIL_USER, // your email address
    pass: process.env.CONTACT_EMAIL_PASS, // app password or real password
  },
});

export const sendContactEmail = async (req, res) => {
  const { firstName, lastName, address, phone, email, message } = req.body;
  if (!firstName || !lastName || !address || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL_USER,
      to: process.env.CONTACT_EMAIL_RECEIVER || process.env.CONTACT_EMAIL_USER, // where you want to receive the contact email
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
