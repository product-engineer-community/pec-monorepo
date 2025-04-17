import { NextResponse } from "next/server";
import { SolapiMessageService } from "solapi";

export async function POST(req: Request) {
  // from webhook, get data
  const data = await req.json();
  const { to, email } = data;
  console.log("🚀 ~ POST ~ data:", data);
  const messageService = new SolapiMessageService(
    process.env.SMS_API_KEY || "",
    process.env.SMS_API_SECRET || "",
  );

  return NextResponse.json({
    message: "success",
  });

  const text = `안녕하세요 ${email}님. PEC 알림 신청 해주셔서 감사합니다. 저는 코치 Boaz 입니다. 혹시 가능하실때 잠깐 전화할 수 있을까요? 캠프에 대해 설명드릴 것이 있어서요`;

  await messageService.send({
    to,
    from: "01050562412",
    text,
  });
}
