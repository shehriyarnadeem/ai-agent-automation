import nodemailer from 'nodemailer';
import {z} from 'zod';
export const emailSendDefination = {
  name: 'email_sending_tool',
  description: 'Send an email',
  strict: true,
  parameters: z.object({
    to: z.string(), // Changed from z.string().email()
    from: z.string(), // Changed from z.string().email()
    subject: z.string(),
    text: z.string(),
  }),
};

export const sendEmail = async ({ toolArgs }) => {
  console.log(toolArgs,'tool args');
  const { to, from, subject, text } = toolArgs;

  console.log('we came here');

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
      user: 'shehriyarnadeemy@gmail.com', // your email
      pass: 'tzpe ydvb mpob eseu'
    },
  });

  // Setup email data
  let mailOptions = {
    from,
    to: to,
    subject,
    text,
  };

  // Send mail with defined transport object
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};
