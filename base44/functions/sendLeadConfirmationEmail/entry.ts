import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const { full_name, email } = await req.json();

  if (!email || !full_name) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const POSTMARK_TOKEN = Deno.env.get('PostMark');

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
      Subject: 'Thanks for reaching out to DutyBoost!',
      HtmlBody: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; color: #1a202c;">
          <img src="https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9a64855b0_ChatGPT_Image_Mar_30__2026__03_06_29_PM-removebg-preview.png" alt="DutyBoost" style="height: 60px; margin-bottom: 32px;" />
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Hi ${full_name}, thanks for getting in touch! 👋</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 16px;">
            We've received your registration and we're excited to connect with you.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 16px;">
            Our team will review your details and get back to you very soon to discuss how <strong>DutyBoost</strong> can work for you.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 32px;">
            In the meantime, feel free to reply to this email if you have any questions.
          </p>
          <p style="font-size: 16px; color: #4a5568;">
            Warm regards,<br/>
            <strong>The DutyBoost Team</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
          <p style="font-size: 12px; color: #a0aec0;">© ${new Date().getFullYear()} DutyBoost — The Travel Retail Conversion Layer</p>
        </div>
      `,
      TextBody: `Hi ${full_name},\n\nThanks for reaching out to DutyBoost! We've received your registration and our team will be in touch with you soon.\n\nWarm regards,\nThe DutyBoost Team`,
      MessageStream: 'outbound',
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    return Response.json({ error: err.Message || 'Failed to send email' }, { status: 500 });
  }

  return Response.json({ success: true });
});