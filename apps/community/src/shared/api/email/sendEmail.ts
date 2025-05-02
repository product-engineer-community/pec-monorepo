"use server";

import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

const COMMENT_MAIL_TEMPLATE_ID = "neqvygm1evdg0p7w";

/**
 * 댓글 알림 이메일 전송 함수
 */
export async function sendEmail({
  recipientEmail,
  recipientName,
  link,
}: {
  recipientEmail: string;
  recipientName: string;
  link: string;
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
    .setTemplateId(COMMENT_MAIL_TEMPLATE_ID)
    .setPersonalization([
      {
        email: recipientEmail,
        data: {
          link,
        },
      },
    ])
    .setSubject("작성하신 게시글에 댓글이 달렸어요!");

  await mailerSend.email.send(emailParams);
}
