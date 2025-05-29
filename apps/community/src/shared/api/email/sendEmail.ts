"use server";

import { Resend } from "resend";

/**
 * 이메일 전송 함수
 */
export async function sendEmail({
  title,
  recipientEmail,
  template,
}: {
  title: string;
  recipientEmail: string;
  template: React.ReactNode;
}) {
  const resend = new Resend(process.env.EMAIL_SERVICE_API_KEY!);

  const { error } = await resend.emails.send({
    from: "PEC <support@productengineer.info>",
    to: [recipientEmail],
    subject: title,
    react: template,
  });
  if (error) {
    console.error(error);
    throw error;
  }
}
