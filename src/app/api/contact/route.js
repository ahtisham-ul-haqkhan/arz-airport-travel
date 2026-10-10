import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Reuse one pooled SMTP connection across requests (avoids TLS + auth handshake every time).
// Stored on globalThis so it survives hot-reloads in dev and warm invocations in production.
function getTransporter({ host, port, secure, user, pass }) {
  const key = `${host}:${port}:${user}:${pass}`;
  if (!globalThis.__arzMailer || globalThis.__arzMailer.key !== key) {
    const transporter = nodemailer.createTransport({
      pool: true,
      maxConnections: 2,
      maxMessages: 100,
      host,
      port,
      secure,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 8000,
      socketTimeout: 15000,
    });
    globalThis.__arzMailer = { key, transporter };
  }
  return globalThis.__arzMailer.transporter;
}

// Escape user-provided content before injecting into HTML
const esc = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function buildEmailHtml({ name, email, phone, subject, message, emailSubject, receivedAt }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const phoneDigits = (phone || '').replace(/[^\d+]/g, '');
  let waNumber = phoneDigits.replace(/^\+/, '');
  if (waNumber.startsWith('0')) waNumber = '44' + waNumber.slice(1); // UK local -> intl

  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: ' + emailSubject)}`;

  const btn = (href, label, bg, color = '#ffffff') => `
    <td align="center" style="padding:4px;">
      <a href="${href}" target="_blank" style="display:block;background-color:${bg};color:${color};text-decoration:none;font-size:14px;font-weight:700;padding:13px 10px;border-radius:12px;white-space:nowrap;">${label}</a>
    </td>`;

  const row = (icon, label, valueHtml, last = false) => `
    <tr>
      <td style="padding:14px 0;${last ? '' : 'border-bottom:1px solid #1F2A44;'}">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="40" valign="top">
              <div style="width:34px;height:34px;line-height:34px;text-align:center;border-radius:10px;background-color:#1A2540;font-size:16px;">${icon}</div>
            </td>
            <td valign="top" style="padding-left:10px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#7C8DB5;margin-bottom:3px;">${label}</div>
              <div style="font-size:15px;font-weight:600;color:#F1F5FF;word-break:break-word;">${valueHtml}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${esc(emailSubject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#070B16;-webkit-text-size-adjust:100%;">
  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${esc(name)} sent a new enquiry: ${esc(subject)} — ${esc(message.slice(0, 90))}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#070B16" style="background-color:#070B16;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;">

          <!-- Brand bar -->
          <tr>
            <td style="padding:0 4px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                      <td style="width:38px;height:38px;border-radius:11px;background-color:#2563EB;background-image:linear-gradient(135deg,#3B82F6,#1D4ED8);text-align:center;vertical-align:middle;font-size:18px;">✈️</td>
                      <td style="padding-left:10px;">
                        <div style="font-size:16px;font-weight:800;color:#FFFFFF;letter-spacing:-0.3px;">ARZ Airport Travel</div>
                        <div style="font-size:11px;color:#7C8DB5;letter-spacing:0.5px;">Stoke-on-Trent · UK</div>
                      </td>
                    </tr></table>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block;background-color:#0F2A1E;border:1px solid #166534;color:#4ADE80;font-size:11px;font-weight:800;letter-spacing:1px;padding:6px 10px;border-radius:999px;">● NEW LEAD</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td bgcolor="#0E1525" style="background-color:#0E1525;border:1px solid #1F2A44;border-radius:22px;overflow:hidden;">

              <!-- Hero -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#1D4ED8" style="background-color:#1D4ED8;background-image:linear-gradient(135deg,#1E3A8A 0%,#2563EB 55%,#7C3AED 100%);padding:30px 26px 28px;border-radius:22px 22px 0 0;">
                    <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C7D7FE;margin-bottom:10px;">Website Enquiry</div>
                    <div style="font-size:26px;line-height:1.25;font-weight:800;color:#FFFFFF;letter-spacing:-0.6px;margin-bottom:8px;">You've got a new<br/>travel enquiry 🚀</div>
                    <div style="font-size:13px;color:#DBE5FF;">🕒 ${esc(receivedAt)}</div>
                  </td>
                </tr>
              </table>

              <!-- Customer -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:24px 26px 6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="60" valign="middle">
                          <div style="width:54px;height:54px;line-height:54px;border-radius:50%;text-align:center;background-color:#F59E0B;background-image:linear-gradient(135deg,#FBBF24,#F97316);color:#1A1205;font-size:20px;font-weight:800;">${esc(initials)}</div>
                        </td>
                        <td valign="middle" style="padding-left:12px;">
                          <div style="font-size:19px;font-weight:800;color:#FFFFFF;letter-spacing:-0.3px;">${esc(name)}</div>
                          <div style="font-size:13px;color:#93A4CC;margin-top:2px;word-break:break-all;">${esc(email)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Quick actions -->
                <tr>
                  <td style="padding:14px 22px 4px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${btn(replyHref, '✉️&nbsp; Reply', '#2563EB')}
                        ${phoneDigits ? btn(`tel:${esc(phoneDigits)}`, '📞&nbsp; Call', '#1A2540', '#E2E8FF') : ''}
                        ${phoneDigits ? btn(`https://wa.me/${esc(waNumber)}`, '💬&nbsp; WhatsApp', '#16A34A') : ''}
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Details -->
                <tr>
                  <td style="padding:18px 26px 4px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111A2E;border:1px solid #1F2A44;border-radius:16px;">
                      <tr><td style="padding:4px 18px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                          ${row('📧', 'Email', `<a href="mailto:${esc(email)}" style="color:#8AB4FF;text-decoration:none;">${esc(email)}</a>`)}
                          ${row('📱', 'Phone', phone ? `<a href="tel:${esc(phoneDigits)}" style="color:#F1F5FF;text-decoration:none;">${esc(phone)}</a>` : '<span style="color:#64748B;font-weight:500;">Not provided</span>')}
                          ${row('🏷️', 'Subject', esc(subject), true)}
                        </table>
                      </td></tr>
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding:18px 26px 28px;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#7C8DB5;margin-bottom:10px;">💬 Customer Message</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="4" style="background-color:#3B82F6;background-image:linear-gradient(180deg,#60A5FA,#7C3AED);border-radius:4px;"></td>
                        <td style="background-color:#111A2E;border:1px solid #1F2A44;border-left:0;border-radius:0 14px 14px 0;padding:18px 20px;">
                          <div style="font-size:15px;line-height:1.7;color:#E2E8FF;white-space:pre-wrap;word-break:break-word;">${esc(message)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Tip -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#0B1220;border-top:1px solid #1F2A44;padding:16px 26px;border-radius:0 0 22px 22px;">
                    <div style="font-size:12.5px;color:#93A4CC;line-height:1.6;">⚡ <strong style="color:#FBBF24;">Pro tip:</strong> Leads replied to within 5 minutes are far more likely to book. Hit <strong style="color:#E2E8FF;">Reply</strong> — it goes straight to the customer.</div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:22px 10px 8px;">
              <div style="font-size:12px;color:#55648A;line-height:1.7;">
                Sent automatically from the <strong style="color:#7C8DB5;">ARZ Airport Travel</strong> website contact form<br/>
                Stoke-on-Trent, United Kingdom
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || user || 'arzairporttravel@gmail.com';

    if (!user || !pass || pass === 'your_app_password_here') {
      return NextResponse.json(
        {
          error:
            'SMTP credentials are not configured yet in .env.local. Please add your SMTP_USER and SMTP_PASS.',
        },
        { status: 500 }
      );
    }

    const transporter = getTransporter({ host, port, secure, user, pass });

    const emailSubject = `✈️ New Enquiry: ${subject?.trim() || 'General Enquiry'} — ${name.trim()}`;

    const receivedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const emailHtml = buildEmailHtml({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      subject: subject?.trim() || 'General Enquiry',
      message: message.trim(),
      emailSubject,
      receivedAt,
    });

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
