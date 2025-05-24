"use server";

import * as React from "react"; // Ensure React is imported if not already
import { Resend } from "resend";

const resend = new Resend(process.env.EMAIL_SERVICE_API_KEY!);

/**
 * 이메일 전송 함수
 */
export async function sendEmail({
  title,
  recipientEmail,
  // recipientName, // No longer directly used by sendEmail if the template handles it
  reactElement, // New parameter for the React email component
}: {
  title: string;
  recipientEmail: string;
  // recipientName: string;
  reactElement: React.ReactElement;
}) {
  const { error } = await resend.emails.send({
    from: "PEC <support@productengineer.info>",
    to: [recipientEmail],
    subject: title,
    react: reactElement, // Use the passed React element
  });
  if (error) {
    console.error("Error sending email:", error); // Added more context to error
    throw error;
  }
}
