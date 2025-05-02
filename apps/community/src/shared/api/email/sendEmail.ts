"use server";

import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

/**
 * 이메일 전송 함수
 */
export async function sendEmail({
  title,
  recipientEmail,
  recipientName,
  templateId,
  data,
}: {
  title: string;
  recipientEmail: string;
  recipientName: string;
  templateId: string;
  data?: Record<string, string>;
}) {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY!,
  });

  const sentFrom = new Sender("support@productengineer.info", "PEC");
  const recipients = [new Recipient(recipientEmail, recipientName)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setTemplateId(templateId)
    .setPersonalization([
      {
        email: recipientEmail,
        data: data ?? {},
      },
    ])
    .setSubject(title);

  await mailerSend.email.send(emailParams);
}
