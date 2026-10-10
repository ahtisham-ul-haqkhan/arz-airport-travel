import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Reuse one pooled SMTP connection across requests
function getTransporter({ host, port, secure, user, pass }) {
  const key = `${host}:${port}:${user}`;
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

function buildBookingEmailHtml({
  refId,
  journeyType,
  pickupLoc,
  dropoffLoc,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  passengers,
  luggage,
  vehicleName,
  fullName,
  email,
  phone,
  notes,
  emailSubject,
  receivedAt,
}) {
  const initials = fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const phoneDigits = (phone || '').replace(/[^\d+]/g, '');
  let waNumber = phoneDigits.replace(/^\+/, '');
  if (waNumber.startsWith('0')) waNumber = '44' + waNumber.slice(1); // UK local -> intl format

  const waPrefill = encodeURIComponent(
    `Hello ${fullName}, thank you for your booking enquiry (${refId}) with ARZ Airport Travel for ${pickupLoc} to ${dropoffLoc}. Here is your fixed quotation:`
  );
  const waHref = `https://wa.me/${esc(waNumber)}?text=${waPrefill}`;

  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: ' + emailSubject)}`;

  const btn = (href, label, bg, color = '#ffffff') => `
    <td align="center" style="padding:4px;">
      <a href="${href}" target="_blank" style="display:block;background-color:${bg};color:${color};text-decoration:none;font-size:13px;font-weight:700;padding:12px 10px;border-radius:10px;white-space:nowrap;">${label}</a>
    </td>`;

  const infoRow = (icon, label, valueHtml, last = false) => `
    <tr>
      <td style="padding:12px 0;${last ? '' : 'border-bottom:1px solid #1F2A44;'}">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="36" valign="top">
              <div style="width:32px;height:32px;line-height:32px;text-align:center;border-radius:8px;background-color:#1A2540;font-size:15px;">${icon}</div>
            </td>
            <td valign="top" style="padding-left:10px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#7C8DB5;margin-bottom:2px;">${label}</div>
              <div style="font-size:14px;font-weight:600;color:#F1F5FF;word-break:break-word;">${valueHtml}</div>
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
    New Booking Ref ${esc(refId)}: ${esc(fullName)} requested a ride from ${esc(pickupLoc)} to ${esc(dropoffLoc)} (${esc(pickupDate)} @ ${esc(pickupTime)})
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#070B16" style="background-color:#070B16;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;">

          <!-- Brand Header Bar -->
          <tr>
            <td style="padding:0 4px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                      <td style="width:40px;height:40px;border-radius:12px;background-color:#2563EB;background-image:linear-gradient(135deg,#3B82F6,#1D4ED8);text-align:center;vertical-align:middle;font-size:20px;">✈️</td>
                      <td style="padding-left:12px;">
                        <div style="font-size:17px;font-weight:800;color:#FFFFFF;letter-spacing:-0.3px;">ARZ Airport Travel</div>
                        <div style="font-size:11px;color:#7C8DB5;letter-spacing:0.5px;">Stoke-on-Trent · United Kingdom</div>
                      </td>
                    </tr></table>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block;background-color:#0F2A1E;border:1px solid #166534;color:#4ADE80;font-size:11px;font-weight:800;letter-spacing:1px;padding:6px 12px;border-radius:999px;">● NEW RIDE BOOKING</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td bgcolor="#0E1525" style="background-color:#0E1525;border:1px solid #1F2A44;border-radius:22px;overflow:hidden;">

              <!-- Hero Banner -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#1D4ED8" style="background-color:#1D4ED8;background-image:linear-gradient(135deg,#1E3A8A 0%,#2563EB 55%,#7C3AED 100%);padding:28px 26px 26px;border-radius:22px 22px 0 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <span style="display:inline-block;background-color:rgba(255,255,255,0.18);color:#FFFFFF;font-size:11px;font-weight:800;letter-spacing:1.5px;padding:4px 10px;border-radius:6px;text-transform:uppercase;margin-bottom:8px;">
                            ${esc(journeyType)}
                          </span>
                        </td>
                        <td align="right">
                          <span style="display:inline-block;background-color:#F59E0B;color:#0F172A;font-size:12px;font-weight:800;letter-spacing:0.8px;padding:4px 10px;border-radius:6px;">
                            REF: ${esc(refId)}
                          </span>
                        </td>
                      </tr>
                    </table>
                    <div style="font-size:24px;line-height:1.25;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;margin-top:10px;margin-bottom:6px;">
                      New Ride Booking Request 🚖
                    </div>
                    <div style="font-size:13px;color:#DBE5FF;">
                      🕒 Received: ${esc(receivedAt)}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Route Highlights Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:22px 24px 8px;">
                    <div style="background-color:#111A2E;border:1.5px solid #283759;border-radius:16px;padding:18px 20px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="32" valign="top">
                            <span style="font-size:20px;">📍</span>
                          </td>
                          <td valign="top" style="padding-left:8px;">
                            <div style="font-size:11px;font-weight:700;color:#93A4CC;letter-spacing:1px;text-transform:uppercase;">PICKUP LOCATION</div>
                            <div style="font-size:16px;font-weight:700;color:#FFFFFF;margin-top:2px;">${esc(pickupLoc)}</div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding:10px 0 10px 14px;">
                            <div style="width:2px;height:18px;background-color:#3B82F6;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td width="32" valign="top">
                            <span style="font-size:20px;">🏁</span>
                          </td>
                          <td valign="top" style="padding-left:8px;">
                            <div style="font-size:11px;font-weight:700;color:#93A4CC;letter-spacing:1px;text-transform:uppercase;">DESTINATION</div>
                            <div style="font-size:16px;font-weight:700;color:#60A5FA;margin-top:2px;">${esc(dropoffLoc)}</div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Journey Schedule Grid -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:10px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="${returnDate ? '49%' : '100%'}" valign="top" style="background-color:#111A2E;border:1px solid #1F2A44;border-radius:14px;padding:14px 16px;">
                          <div style="font-size:11px;font-weight:700;color:#FBBF24;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">🗓️ Pickup Schedule</div>
                          <div style="font-size:15px;font-weight:700;color:#FFFFFF;">${esc(pickupDate)}</div>
                          <div style="font-size:13px;font-weight:600;color:#93A4CC;margin-top:2px;">⏰ ${esc(pickupTime)}</div>
                        </td>
                        ${returnDate ? `
                        <td width="2%"></td>
                        <td width="49%" valign="top" style="background-color:#111A2E;border:1px solid #1F2A44;border-radius:14px;padding:14px 16px;">
                          <div style="font-size:11px;font-weight:700;color:#A78BFA;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">🔄 Return Schedule</div>
                          <div style="font-size:15px;font-weight:700;color:#FFFFFF;">${esc(returnDate)}</div>
                          <div style="font-size:13px;font-weight:600;color:#93A4CC;margin-top:2px;">⏰ ${esc(returnTime)}</div>
                        </td>` : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Capacity & Fleet Info -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:10px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111A2E;border:1px solid #1F2A44;border-radius:14px;">
                      <tr>
                        <td width="33%" align="center" style="padding:14px 10px;border-right:1px solid #1F2A44;">
                          <div style="font-size:18px;">👥</div>
                          <div style="font-size:15px;font-weight:700;color:#FFFFFF;margin-top:2px;">${esc(passengers)} Passengers</div>
                          <div style="font-size:11px;color:#7C8DB5;">Group size</div>
                        </td>
                        <td width="33%" align="center" style="padding:14px 10px;border-right:1px solid #1F2A44;">
                          <div style="font-size:18px;">🧳</div>
                          <div style="font-size:15px;font-weight:700;color:#FFFFFF;margin-top:2px;">${esc(luggage)} Suitcases</div>
                          <div style="font-size:11px;color:#7C8DB5;">Luggage bags</div>
                        </td>
                        <td width="34%" align="center" style="padding:14px 10px;">
                          <div style="font-size:18px;">🚘</div>
                          <div style="font-size:13px;font-weight:700;color:#FBBF24;margin-top:2px;">Wheelchair Accessible</div>
                          <div style="font-size:11px;color:#7C8DB5;">Private Hire Vehicle</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Passenger Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:14px 24px 6px;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#7C8DB5;margin-bottom:10px;">👤 Passenger Information</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111A2E;border:1px solid #1F2A44;border-radius:16px;padding:16px;">
                      <tr>
                        <td style="padding:14px 16px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="56" valign="middle">
                                <div style="width:48px;height:48px;line-height:48px;border-radius:50%;text-align:center;background-color:#F59E0B;background-image:linear-gradient(135deg,#FBBF24,#F97316);color:#1A1205;font-size:18px;font-weight:800;">
                                  ${esc(initials)}
                                </div>
                              </td>
                              <td valign="middle" style="padding-left:12px;">
                                <div style="font-size:18px;font-weight:800;color:#FFFFFF;letter-spacing:-0.2px;">${esc(fullName)}</div>
                                <div style="font-size:13px;color:#93A4CC;margin-top:2px;">
                                  <a href="mailto:${esc(email)}" style="color:#8AB4FF;text-decoration:none;">${esc(email)}</a>
                                </div>
                                <div style="font-size:13px;color:#E2E8FF;margin-top:2px;font-weight:600;">
                                  📞 <a href="tel:${esc(phoneDigits)}" style="color:#F1F5FF;text-decoration:none;">${esc(phone)}</a>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Quick Actions for Driver -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:12px 20px 6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${btn(replyHref, '✉️&nbsp; Reply Email', '#2563EB')}
                        ${phoneDigits ? btn(`tel:${esc(phoneDigits)}`, '📞&nbsp; Direct Call', '#1A2540', '#E2E8FF') : ''}
                        ${phoneDigits ? btn(waHref, '💬&nbsp; WhatsApp Quote', '#16A34A') : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Special Instructions / Flight Details -->
              ${notes && notes !== 'None specified' ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:14px 24px 20px;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#7C8DB5;margin-bottom:8px;">📝 Special Instructions / Flight Notes</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="4" style="background-color:#F59E0B;background-image:linear-gradient(180deg,#FBBF24,#EA580C);border-radius:4px;"></td>
                        <td style="background-color:#111A2E;border:1px solid #1F2A44;border-left:0;border-radius:0 14px 14px 0;padding:16px 18px;">
                          <div style="font-size:14px;line-height:1.6;color:#F1F5FF;white-space:pre-wrap;word-break:break-word;">${esc(notes)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>` : `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="height:12px;"></td></tr>
              </table>`}

              <!-- Driver Pro Tip Footer -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#0B1220;border-top:1px solid #1F2A44;padding:16px 24px;border-radius:0 0 22px 22px;">
                    <div style="font-size:12.5px;color:#93A4CC;line-height:1.6;">
                      ⚡ <strong style="color:#FBBF24;">Next Step:</strong> Contact the customer promptly with your fixed guaranteed quotation. Click <strong style="color:#4ADE80;">WhatsApp Quote</strong> to open a pre-filled chat with this reference.
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- System Footer -->
          <tr>
            <td align="center" style="padding:22px 10px 8px;">
              <div style="font-size:12px;color:#55648A;line-height:1.7;">
                Sent automatically by the <strong style="color:#7C8DB5;">ARZ Airport Travel Booking Engine</strong><br/>
                Stoke-on-Trent, Staffordshire, United Kingdom &bull; Ref: ${esc(refId)}
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
    const {
      refId = 'ARZ-' + Math.floor(100000 + Math.random() * 900000),
      journeyType = 'One Way Journey',
      pickupLoc,
      dropoffLoc,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      passengers = 1,
      luggage = 0,
      vehicleName = 'Wheelchair Accessible Private Hire Vehicle',
      fullName,
      email,
      phone,
      notes,
    } = body;

    // Validation
    if (!pickupLoc || !pickupLoc.trim()) {
      return NextResponse.json({ error: 'Pickup location is required.' }, { status: 400 });
    }

    if (!dropoffLoc || !dropoffLoc.trim()) {
      return NextResponse.json({ error: 'Destination is required.' }, { status: 400 });
    }

    if (!pickupDate || !pickupTime) {
      return NextResponse.json({ error: 'Pickup date and time are required.' }, { status: 400 });
    }

    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: 'Contact phone number is required.' }, { status: 400 });
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

    const emailSubject = `🚖 New Booking [${refId}]: ${pickupLoc.trim()} ➔ ${dropoffLoc.trim()} — ${fullName.trim()}`;

    const receivedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const emailHtml = buildBookingEmailHtml({
      refId,
      journeyType,
      pickupLoc: pickupLoc.trim(),
      dropoffLoc: dropoffLoc.trim(),
      pickupDate,
      pickupTime,
      returnDate: returnDate || null,
      returnTime: returnTime || null,
      passengers,
      luggage,
      vehicleName,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes?.trim() || '',
      emailSubject,
      receivedAt,
    });

    // Plain text alternative
    const emailText = `ARZ Airport Travel - New Ride Booking Request
Reference: ${refId}
Received: ${receivedAt}

Journey Type: ${journeyType}
Pickup: ${pickupLoc.trim()}
Destination: ${dropoffLoc.trim()}
Pickup Date & Time: ${pickupDate} at ${pickupTime}
${returnDate ? `Return Date & Time: ${returnDate} at ${returnTime}\n` : ''}
Vehicle: ${vehicleName}
Passengers: ${passengers}
Luggage: ${luggage} bags

Passenger Details:
Name: ${fullName.trim()}
Email: ${email.trim()}
Phone: ${phone.trim()}

Special Instructions:
${notes?.trim() || 'None specified'}

----------------------------------------
Sent from ARZ Airport Travel Booking Engine
`;

    // Send Mail
    await transporter.sendMail({
      from: `"ARZ Airport Travel Bookings" <${user}>`,
      to: receiver,
      replyTo: email.trim(),
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      refId,
      message: `Your booking enquiry (Ref: ${refId}) has been successfully submitted! Our team will contact you shortly.`,
    });
  } catch (error) {
    console.error('Booking Form SMTP Error:', error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          'Failed to send booking request via SMTP. Please verify your SMTP settings in .env.local.',
      },
      { status: 500 }
    );
  }
}
