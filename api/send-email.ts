import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = 'https://portfolio-notfound.vercel.app';

interface ThemeConfig {
  bg: string;
  cardBg: string;
  text: string;
  secondaryText: string;
  border: string;
  accent: string;
  logo: string;
}

const THEMES: Record<string, ThemeConfig> = {
  dark: {
    bg: '#05070a',
    cardBg: 'rgba(255,255,255,0.03)',
    text: '#ffffff',
    secondaryText: '#888888',
    border: 'rgba(0, 132, 255, 0.2)',
    accent: '#0084ff',
    logo: `${SITE_URL}/favicon-96x96.png` // Assuming this is the light-on-dark logo
  },
  light: {
    bg: '#f8fafc',
    cardBg: '#ffffff',
    text: '#0f172a',
    secondaryText: '#64748b',
    border: '#e2e8f0',
    accent: '#0066cc',
    logo: `${SITE_URL}/favicon-96x96.png` // In a real scenario, you'd use a dark-on-light logo
  }
};

const emailTemplate = (content: string, title: string, themeName: 'dark' | 'light' = 'dark') => {
  const theme = THEMES[themeName];
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { box-sizing: border-box; }
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; padding: 10px !important; }
            .card { border-radius: 8px !important; width: 100% !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: ${theme.bg}; color: ${theme.text}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div class="container" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div class="card" style="background-color: ${theme.cardBg}; border: 1px solid ${theme.border}; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            
            <!-- Header (Logo Only) -->
            <div style="padding: 40px 30px 20px; text-align: center;">
              <img src="${theme.logo}" alt="404 Logo" style="width: 60px; height: 60px; display: inline-block;" />
              <h1 style="margin: 15px 0 0; color: ${theme.accent}; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                404: <span style="color: ${theme.text};">NOT FOUND</span>
              </h1>
            </div>

            <!-- Main Content -->
            <div style="padding: 20px 30px 40px;">
              <h2 style="margin-top: 0; font-size: 20px; color: ${theme.text}; border-left: 4px solid ${theme.accent}; padding-left: 15px;">${title}</h2>
              <div style="color: ${theme.secondaryText}; font-size: 16px; margin-top: 20px;">
                ${content}
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 30px; background: rgba(0,0,0,0.05); border-top: 1px solid ${theme.border}; text-align: center;">
              <div style="margin-bottom: 20px;">
                <a href="https://github.com/Four-O-Four-Not-Found" style="display: inline-block; margin: 0 12px; text-decoration: none;">
                  <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style="width: 20px; height: 20px; filter: ${themeName === 'dark' ? 'invert(1)' : 'none'}; opacity: 0.6;" />
                </a>
                <a href="mailto:dreamteamdevs@outlook.com" style="display: inline-block; margin: 0 12px; text-decoration: none;">
                  <img src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png" alt="Email" style="width: 20px; height: 20px; filter: ${themeName === 'dark' ? 'invert(1)' : 'none'}; opacity: 0.6;" />
                </a>
                <a href="${SITE_URL}/" style="display: inline-block; margin: 0 12px; text-decoration: none;">
                  <img src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png" alt="Website" style="width: 20px; height: 20px; filter: ${themeName === 'dark' ? 'invert(1)' : 'none'}; opacity: 0.6;" />
                </a>
              </div>

              <p style="margin: 0; font-size: 11px; color: ${theme.secondaryText}; letter-spacing: 0.5px; text-transform: uppercase;">
                © 2026 404: NOT FOUND. 
                <br/>
                Automated Inquiry Confirmation
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { user_name, user_email, date, time, service, message, request_type } = req.body;
  const isAppointment = request_type === 'appointment';
  
  // You can dynamically set this based on user preference or time of day
  const activeTheme = 'dark'; 

  try {
    // 1. Send Notification to the TEAM
    await resend.emails.send({
      from: '404: Not Found <onboarding@resend.dev>',
      to: 'dreamteamdevs@outlook.com',
      subject: `[${request_type?.toUpperCase()}] ${service} - ${user_name}`,
      html: emailTemplate(`
        <p>You have received a new <strong>${request_type}</strong> from your portfolio.</p>
        <div style="background: rgba(0, 132, 255, 0.05); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${THEMES[activeTheme].accent};">
          <p style="margin: 5px 0;"><strong>Name:</strong> ${user_name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${user_email}</p>
          <p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>
          ${isAppointment ? `<p style="margin: 5px 0;"><strong>Schedule:</strong> ${date} at ${time}</p>` : ''}
        </div>
        <p><strong>Message:</strong></p>
        <p style="font-style: italic; color: ${THEMES[activeTheme].secondaryText};">"${message}"</p>
      `, `New ${request_type === 'appointment' ? 'Appointment' : 'Inquiry'} Details`, activeTheme),
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
          <div style="background: rgba(0, 132, 255, 0.05); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${THEMES[activeTheme].accent};">
            <p style="margin: 0;"><strong>Requested Schedule:</strong> ${date} at ${time}</p>
          </div>
        ` : ''}
        <p>In the meantime, feel free to check out our latest projects on our website.</p>
        <div style="margin-top: 30px;">
          <a href="${SITE_URL}/" style="background: ${THEMES[activeTheme].accent}; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Visit Our Site</a>
        </div>
      `, `Message Received`, activeTheme),
    });

    return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error: any) {
    console.error('Resend Error:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
