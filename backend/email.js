import sgMail from '@sendgrid/mail';

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@civicissue.com';

if (!sendgridApiKey) {
  console.warn('[email] Missing SendGrid API key. Emails will fail until configured.');
} else {
  sgMail.setApiKey(sendgridApiKey);
  console.log('[email] SendGrid configured');
}

export async function sendConfirmationEmail(to, payload) {
  const { referenceId, category, city, pincode, street, coordinates } = payload;
  
  if (!sendgridApiKey) {
    console.warn('[email] SendGrid not configured, skipping email');
    return;
  }

  const msg = {
    to,
    from: fromEmail,
    subject: 'Your issue has been successfully recorded',
    text: buildPlainText({ referenceId, category, city, pincode, street, coordinates }),
    html: buildHtml({ referenceId, category, city, pincode, street, coordinates }),
  };

  try {
    await sgMail.send(msg);
    console.log('[email] Confirmation email sent successfully to:', to);
  } catch (err) {
    // Log email error but don't fail the form submission
    console.warn('[email] Failed to send confirmation email:', err.message);
    console.warn('[email] Note: Issue has been saved to Firestore regardless of email failure');
    // Don't throw - let the form submission complete successfully
  }
}

function buildPlainText({ referenceId, category, city, pincode, street, coordinates }) {
  let locationText = `${city || 'City N/A'}, ${pincode || 'Pincode N/A'}`;
  if (street) {
    locationText += `, ${street}`;
  }
  if (coordinates?.lat && coordinates?.lng) {
    locationText += ` (Coordinates: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)})`;
  }
  
  return [
    'Hello,',
    '',
    'Thank you for reporting the issue.',
    '',
    'Your complaint has been successfully registered.',
    '',
    `Reference ID: ${referenceId}`,
    `Issue Type: ${category}`,
    `Location: ${locationText}`,
    '',
    'Our team has forwarded this issue to the concerned government department.',
    'Please keep the reference ID for future communication.',
    '',
    'Regards,',
    'Citizen Issue Reporting Team',
  ].join('\n');
}

function buildHtml({ referenceId, category, city, pincode, street, coordinates }) {
  let locationHtml = `${city || 'City N/A'}, ${pincode || 'Pincode N/A'}`;
  if (street) {
    locationHtml += `, ${street}`;
  }
  let mapsLink = '';
  let mapEmbed = '';
  
  if (coordinates?.lat && coordinates?.lng) {
    const lat = coordinates.lat.toFixed(4);
    const lng = coordinates.lng.toFixed(4);
    mapsLink = `<br/><a href="https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}" target="_blank" style="color: #2563eb; text-decoration: none;">View on Google Maps →</a>`;
    mapEmbed = `
    <div style="margin-top: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <a href="https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}" target="_blank">
        <img src="https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=15&size=400x300&markers=${coordinates.lat},${coordinates.lng}" alt="Issue Location Map" style="width: 100%; height: auto; display: block;" />
      </a>
      <p style="margin: 10px; font-size: 12px; color: #666;">Coordinates: ${lat}, ${lng}</p>
    </div>`;
  }
  
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px;">
    <p>Hello,</p>
    <p>Thank you for reporting the issue.</p>
    <p>Your complaint has been successfully registered.</p>
    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <p style="margin: 8px 0;"><strong>Reference ID:</strong> ${referenceId}</p>
      <p style="margin: 8px 0;"><strong>Issue Type:</strong> ${category}</p>
      <p style="margin: 8px 0;"><strong>Location:</strong> ${locationHtml}${mapsLink}</p>
    </div>
    ${mapEmbed}
    <p style="margin-top: 20px;">Our team has forwarded this issue to the concerned government department.<br/>
       Please keep the reference ID for future communication.</p>
    <p style="margin-top: 15px; color: #666; font-size: 12px;">Regards,<br/>Citizen Issue Reporting Team</p>
  </div>`;
}
