import * as PortOne from "@portone/server-sdk";
import { NextRequest, NextResponse } from "next/server";

// 환경 변수가 undefined일 수 있으므로 기본값 처리
const apiSecret = process.env.V2_API_SECRET || "";
const portone = PortOne.PortOneClient({ secret: apiSecret });

// 결제 데이터 저장소
const paymentStore = new Map<string, { status: string }>();

// 상품 목록 (실제 환경에서는 데이터베이스에서 가져와야 함)
const items = new Map<
  string,
  { name: string; price: number; currency: string }
>();
items.set("nextjs", {
  name: `Next.js 까보기: "쓸 줄 아는 개발자"에서 "알고 쓰는 개발자"로`,
  price: 132000,
  currency: "KRW",
});

// Next.js App Router API Route 처리 함수
export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { paymentId } = body;
    console.log("🚀 ~ POST ~ paymentId:", paymentId);

    if (typeof paymentId !== "string") {
      return NextResponse.json(
        { message: "올바르지 않은 요청입니다." },
        { status: 400 },
      );
    }

    const payment = await syncPayment(paymentId);

    if (!payment) {
      return NextResponse.json(
        { message: "결제 동기화에 실패했습니다." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      status: payment.status,
    });
  } catch (error) {
    console.error("결제 완료 처리 중 오류 발생:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

async function syncPayment(paymentId: string) {
  if (!paymentStore.has(paymentId)) {
    paymentStore.set(paymentId, {
      status: "PENDING",
    });
  }

  const payment = paymentStore.get(paymentId);

  let actualPayment;
  try {
    actualPayment = await portone.payment.getPayment({ paymentId });
  } catch (error) {
    // PortOne 라이브러리 오류 타입 확인
    if (error instanceof Error && error.name === "PortOneError") return false;
    throw error;
  }

  console.log("🚀 ~ syncPayment ~ actualPayment:", actualPayment);
  if (actualPayment.status === "PAID") {
    if (!verifyPayment(actualPayment)) return false;
    if (payment?.status === "PAID") return payment;
    if (payment) payment.status = "PAID";
    console.info("결제 성공", actualPayment);
  } else {
    return false;
  }

  console.log("🚀 ~ syncPayment ~ payment:", payment);
  return payment;
}

interface PaymentData {
  customData?: string;
  orderName: string;
  amount: { total: number };
  currency: string;
}

function verifyPayment(payment: PaymentData): boolean {
  console.log("🚀 ~ verifyPayment ~ payment:", payment);
  if (payment.customData == null) return false;

  try {
    const customData = JSON.parse(payment.customData);
    console.log("🚀 ~ verifyPayment ~ customData:", customData);
    const item = items.get(customData.id);
    console.log("🚀 ~ verifyPayment ~ item:", item);

    if (item == null) return false;

    return (
      payment.orderName === item.name &&
      payment.amount.total === item.price &&
      payment.currency === item.currency
    );
  } catch (error) {
    console.error("결제 검증 중 오류 발생:", error);
    return false;
  }
}
