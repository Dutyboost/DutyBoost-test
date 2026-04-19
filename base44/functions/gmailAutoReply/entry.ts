import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import nodemailer from 'npm:nodemailer@6.9.7';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const messageIds = body.data.new_message_ids ?? [];
    if (messageIds.length === 0) {
      return Response.json({ processed: 0 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    let processedCount = 0;

    for (const messageId of messageIds) {
      try {
        // Fetch full message
        const messageRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (!messageRes.ok) continue;
        const message = await messageRes.json();

        // Get headers
        const headers = message.payload.headers.reduce((acc, h) => {
          acc[h.name.toLowerCase()] = h.value;
          return acc;
        }, {});

        const fromEmail = headers.from || '';
        const subject = headers.subject || '';
        const messageThreadId = message.threadId;

        // Check if it's a support request (keywords in subject or from traveler domain)
        const isSupportRequest = /support|help|issue|problem|question/i.test(subject);

        if (!isSupportRequest) {
          continue;
        }

        // Build auto-reply message
        const replySubject = subject.startsWith('Re:') ? subject : `Re: ${subject}`;
        const autoReplyText = `Hi,

Thank you for contacting DutyBoost support. We've received your request and will get back to you as soon as possible.

Our team typically responds within 24 hours.

Best regards,
DutyBoost Support Team`;

        // Create MIME message for reply
        const mimeMessage = [
          `From: me`,
          `To: ${fromEmail}`,
          `Subject: ${replySubject}`,
          `In-Reply-To: ${headers['message-id'] || ''}`,
          `References: ${headers['message-id'] || ''}`,
          `Content-Type: text/plain; charset=UTF-8`,
          ``,
          autoReplyText
        ].join('\r\n');

        const encodedMessage = btoa(mimeMessage).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

        // Send the reply via Gmail API
        const sendRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/send`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              raw: encodedMessage,
              threadId: messageThreadId
            })
          }
        );

        if (sendRes.ok) {
          processedCount++;
        }
      } catch (msgErr) {
        console.error(`Error processing message ${messageId}:`, msgErr.message);
      }
    }

    return Response.json({ processed: processedCount, total: messageIds.length });
  } catch (error) {
    console.error('Gmail auto-reply error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});