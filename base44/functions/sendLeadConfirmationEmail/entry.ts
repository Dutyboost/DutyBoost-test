import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const { full_name, email } = await req.json();

  if (!email || !full_name) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const POSTMARK_TOKEN = Deno.env.get('PostMark');

  const firstName = (full_name.split(' ')[0] || full_name).trim();

  const htmlBody = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; color: #1a202c;">
      <img src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9a64855b0_ChatGPT_Image_Mar_30__2026__03_06_29_PM-removebg-preview.png" alt="DutyBoost" style="height: 60px; margin-bottom: 32px;" />
      <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 16px;">Hi ${firstName},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 16px;">
        Thank you for your interest in partnering with DutyBoost.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 16px;">
        We've received your enquiry, and a member of our Partnerships Team will contact you within one business day to schedule a 30-minute introductory call.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 32px;">
        During the call, we'll discuss your platform, our straightforward API integration, the commercial partnership model, and the recurring revenue opportunity for your organisation.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 16px;">
        We look forward to speaking with you soon.
      </p>
      <p style="font-size: 16px; color: #4a5568;">
        Kind regards,<br/><br/>
        <strong>The DutyBoost Partnerships Team</strong>
      </p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
      <p style="font-size: 12px; color: #a0aec0;">&#169; ${new Date().getFullYear()} DutyBoost &#8212; The Travel Retail Conversion Layer</p>
    </div>
  `;

  const textBody = [
    `Hi ${firstName},`,
    "",
    "Thank you for your interest in partnering with DutyBoost.",
    "",
    "We've received your enquiry, and a member of our Partnerships Team will contact you within one business day to schedule a 30-minute introductory call.",
    "",
    "During the call, we'll discuss your platform, our straightforward API integration, the commercial partnership model, and the recurring revenue opportunity for your organisation.",
    "",
    "We look forward to speaking with you soon.",
    "",
    "Kind regards,",
    "",
    "The DutyBoost Partnerships Team",
  ].join("\n");

  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': POSTMARK_TOKEN,
    },
    body: JSON.stringify({
      From: 'hello@dutyboost.com',
      To: email,
      Subject: 'Thank you for your interest in partnering with DutyBoost',
      HtmlBody: htmlBody,
      TextBody: textBody,
      MessageStream: 'outbound',
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    return Response.json({ error: err.Message || 'Failed to send email' }, { status: 500 });
  }

  return Response.json({ success: true });
});