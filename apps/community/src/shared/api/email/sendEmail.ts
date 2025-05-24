"use server";

import { Resend } from "resend";

import EmailTemplate from "./EmailTemplate";

const resend = new Resend(process.env.EMAIL_SERVICE_API_KEY!);

/**
 * 이메일 전송 함수
 */
export async function sendEmail({
  title,
  recipientEmail,
  recipientName,
  data,
}: {
  title: string;
  recipientEmail: string;
  recipientName: string;
  data: Record<string, string>;
}) {
  const { error } = await resend.emails.send({
    from: "PEC <support@productengineer.info>",
    to: [recipientEmail],
    subject: title,
    react: EmailTemplate({
      name: recipientName,
      type: data.type,
      postId: data.postId,
    }),
  });
  if (error) {
    console.error(error);
    throw error;
  }
}
