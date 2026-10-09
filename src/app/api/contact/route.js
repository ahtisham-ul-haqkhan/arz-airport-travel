import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Basic Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message content is required.' }, { status: 400 });
    }

    // SMTP Configuration from Environment Variables
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || user || 'zafarirshad97@gmail.com';

    if (!user || !pass || pass === 'your_app_password_here') {
      return NextResponse.json(
        {
          error:
            'SMTP credentials are not configured yet in .env.local. Please add your SMTP_USER and SMTP_PASS.',
        },
        { status: 500 }
      );
    }

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const emailSubject = `New Travel Enquiry: ${subject?.trim() || 'General Enquiry'} — ${name.trim()}`;

    // Clean, professional HTML template
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%); padding: 24px 30px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">ARZ Airport Travel</h2>
          <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">New Website Contact Form Enquiry</p>
        </div>

        <div style="padding: 30px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; width: 140px; color: #64748b; font-size: 14px; font-weight: 600;">Full Name:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 700;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Email Address:</td>
              <td style="padding: 8px 0; color: #1d4ed8; font-size: 15px; font-weight: 600;">
                <a href="mailto:${email.trim()}" style="color: #1d4ed8; text-decoration: none;">${email.trim()}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Phone Number:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 600;">
                ${phone?.trim() ? `<a href="tel:${phone.trim()}" style="color: #0f172a; text-decoration: none;">${phone.trim()}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Subject:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 600;">${subject?.trim() || 'General Enquiry'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Received At:</td>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">${new Date().toLocaleString('en-GB')}</td>
            </tr>
          </table>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
            <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Customer Message:</div>
            <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</p>
          </div>

          <div style="padding-top: 16px; border-top: 1px solid #f1f5f9; display: flex; gap: 12px;">
            <a href="mailto:${email.trim()}?subject=Re: ${encodeURIComponent(emailSubject)}" style="display: inline-block; background: #1D4ED8; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
              Direct Reply to Customer &rarr;
            </a>
          </div>
        </div>

        <div style="background: #f1f5f9; padding: 14px 30px; text-align: center; color: #94a3b8; font-size: 12px;">
          Sent from ARZ Airport Travel Contact Form &bull; Stoke-on-Trent, UK
        </div>
      </div>
    `;

    // Plain text alternative
    const emailText = `New Customer Travel Enquiry

Full Name: ${name.trim()}
Email Address: ${email.trim()}
Phone Number: ${phone?.trim() || 'Not provided'}
Subject: ${subject?.trim() || 'General Enquiry'}
Date: ${new Date().toLocaleString('en-GB')}

Message:
${message.trim()}

----------------------------------------
ARZ Airport Travel Website`;

    // Send Mail
    await transporter.sendMail({
      from: `"ARZ Airport Travel" <${user}>`,
      to: receiver,
      replyTo: email.trim(),
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! Our team will contact you shortly.',
    });
  } catch (error) {
    console.error('Contact Form SMTP Error:', error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          'Failed to send message via SMTP. Please verify your SMTP settings in .env.local.',
      },
      { status: 500 }
    );
  }
}
