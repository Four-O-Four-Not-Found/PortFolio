import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND_COLOR = '#0084ff';
const BG_COLOR = '#05070a';
const TEXT_COLOR = '#ffffff';

const SITE_URL = 'https://portfolio-three-beige-95.vercel.app';

const emailTemplate = (content: string, title: string) => `
  <div style="background-color: ${BG_COLOR}; color: ${TEXT_COLOR}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 20px; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; background: rgba(255,255,255,0.03); border: 1px solid rgba(0, 132, 255, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
      
      <!-- Header -->
      <div style="padding: 30px; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: center;">
        <img src="${SITE_URL}/favicon.svg" alt="404 Logo" style="width: 50px; height: 50px; margin-bottom: 15px;" />
        <h1 style="margin: 0; color: ${BRAND_COLOR}; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
          404: <span style="color: #fff;">NOT FOUND</span>
        </h1>
        <div style="margin-top: 15px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">
          <a href="${SITE_URL}/" style="color: #888; text-decoration: none; margin: 0 10px;">Website</a>
          <a href="https://github.com/Four-O-Four-Not-Found" style="color: #888; text-decoration: none; margin: 0 10px;">GitHub</a>
          <a href="${SITE_URL}/#team" style="color: #888; text-decoration: none; margin: 0 10px;">The Collective</a>
        </div>
      </div>

      <!-- Main Content -->
      <div style="padding: 40px 30px;">
        <h2 style="margin-top: 0; font-size: 20px; color: #fff;">${title}</h2>
        <div style="color: #ccc; font-size: 16px;">
          ${content}
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 30px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.05); text-align: center; font-size: 12px; color: #666;">
        <p style="margin: 0 0 10px;">© 2026 404: Not Found Collective. All rights reserved.</p>
        <p style="margin: 0;">Building high-performance digital experiences.</p>
      </div>
    </div>
  </div>
`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { user_name, user_email, date, time, service, message, request_type } = req.body;
  const isAppointment = request_type === 'appointment';

  try {
    // 1. Send Notification to the TEAM
    await resend.emails.send({
      from: '404: Not Found <onboarding@resend.dev>',
      to: 'dreamteamdevs@outlook.com',
      subject: `[${request_type?.toUpperCase()}] ${service} - ${user_name}`,
      html: emailTemplate(`
        <p>You have received a new <strong>${request_type}</strong> from your portfolio.</p>
        <div style="background: rgba(0, 132, 255, 0.05); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${BRAND_COLOR};">
          <p style="margin: 5px 0;"><strong>Name:</strong> ${user_name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${user_email}</p>
          <p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>
          ${isAppointment ? `<p style="margin: 5px 0;"><strong>Schedule:</strong> ${date} at ${time}</p>` : ''}
        </div>
        <p><strong>Message:</strong></p>
        <p style="font-style: italic; color: #aaa;">"${message}"</p>
      `, `New ${request_type === 'appointment' ? 'Appointment' : 'Inquiry'} Details`),
    });

    // 2. Send Confirmation to the USER
    await resend.emails.send({
      from: '404: Not Found <onboarding@resend.dev>',
      to: user_email,
      subject: `Confirmation: We've received your ${request_type}`,
      html: emailTemplate(`
        <p>Hi ${user_name},</p>
        <p>Thank you for reaching out to <strong>404: Not Found</strong>. We have successfully received your ${request_type} regarding <strong>${service}</strong>.</p>
        <p>Our team is currently reviewing your request and we will get back to you within 24-48 hours.</p>
        ${isAppointment ? `
          <div style="background: rgba(0, 132, 255, 0.05); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${BRAND_COLOR};">
            <p style="margin: 0;"><strong>Requested Schedule:</strong> ${date} at ${time}</p>
            <p style="margin: 5px 0 0; font-size: 13px; color: #888;">*Note: This schedule is pending confirmation from our team.</p>
          </div>
        ` : ''}
        <p>In the meantime, feel free to check out our latest projects on our website.</p>
        <div style="margin-top: 30px;">
          <a href="https://portfolio-three-beige-95.vercel.app/" style="background: ${BRAND_COLOR}; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Visit Our Site</a>
        </div>
      `, `Message Received`),
    });

    return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error: any) {
    console.error('Resend Error:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
