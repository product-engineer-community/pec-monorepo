import { NextResponse } from "next/server";
import { SolapiMessageService } from "solapi";

export async function POST(req: Request) {
  // from webhook, get data
  const data: FormbricksWebhookData = await req.json();
  //TODO: 9기 알림 신청에서의 값 즉, 10기 에는 바꿔줘야함
  const to = data?.data?.data?.camyx1dh1a0zzkgq87qo0os8;
  const email = data?.data?.data?.g5m3b6gh9l5rpatm93p7s3pj;
  const messageService = new SolapiMessageService(
    process.env.SMS_API_KEY || "",
    process.env.SMS_API_SECRET || "",
  );

  const text = `안녕하세요 ${email}님. PEC 알림 신청 해주셔서 감사합니다. 저는 코치 Boaz 입니다. 혹시 가능하실때 잠깐 전화할 수 있을까요? 캠프에 대해 설명드릴 것이 있어서요`;

  try {
    if (to && email) {
      await messageService.send({
        to,
        from: "01050562412",
        text,
      });
    }

    return NextResponse.json({
      message: "success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

interface FormbricksWebhookData {
  webhookId: string;
  event: string;
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    surveyId: string;
    displayId: string;
    contact: null;
    contactAttributes: null;
    finished: boolean;
    endingId: null;
    data: {
      [key: string]: string;
    };
    variables: Record<string, unknown>;
    ttc: Record<string, number>;
    notes: unknown[];
    tags: unknown[];
    meta: Record<string, unknown>;
    singleUseId: null;
    language: null;
  };
}
