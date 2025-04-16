"use client";

import { Button } from "@pec/shared";
import * as PortOne from "@portone/browser-sdk/v2";
import { useState } from "react";

interface PaymentButtonProps {
  price: number;
  orderName: string;
  payMethod:
    | "CARD"
    | "VIRTUAL_ACCOUNT"
    | "TRANSFER"
    | "MOBILE"
    | "GIFT_CERTIFICATE"
    | "EASY_PAY"
    | "PAYPAL"
    | "ALIPAY"
    | "CONVENIENCE_STORE";
  currency?: "CURRENCY_KRW" | "CURRENCY_USD" | "CURRENCY_EUR" | "CURRENCY_JPY";
}

interface PaymentStatus {
  status: "IDLE" | "PENDING" | "PAID" | "FAILED";
  message?: string;
}

export default function PaymentButton({
  price,
  orderName,
  payMethod,
  currency = "CURRENCY_KRW",
}: PaymentButtonProps) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    status: "IDLE",
  });

  const handleClick = async () => {
    setPaymentStatus({ status: "PENDING" });
    const paymentId = crypto.randomUUID();

    try {
      const payment = await PortOne.requestPayment({
        storeId: "store-0c30bf7a-b560-4d50-bf82-bb65844b5990",
        channelKey: "channel-key-3b9c9060-eb0e-41b3-ae72-e31b9342bb51",
        paymentId,
        orderName,
        totalAmount: price,
        currency,
        payMethod,
        customData: { id: "nextjs", price, currency },
      });

      if (payment?.code !== undefined) {
        setPaymentStatus({
          status: "FAILED",
          message: payment.message,
        });
        return;
      }

      console.log("🚀 ~ handleClick ~ payment:", payment);

      const completeResponse = await fetch(`/lectures/payment/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: payment?.paymentId,
        }),
      });

      if (completeResponse.ok) {
        const paymentComplete = await completeResponse.json();
        setPaymentStatus({
          status: paymentComplete.status || "PAID",
        });
      } else {
        setPaymentStatus({
          status: "FAILED",
          message: await completeResponse.text(),
        });
      }
    } catch (error) {
      setPaymentStatus({
        status: "FAILED",
        message:
          error instanceof Error
            ? error.message
            : "결제 처리 중 오류가 발생했습니다.",
      });
    }
  };

  const handleClose = () => {
    setPaymentStatus({
      status: "IDLE",
    });
  };

  const isWaitingPayment = paymentStatus.status !== "IDLE";

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isWaitingPayment}
        aria-busy={isWaitingPayment}
      >
        결제하기
      </Button>

      {paymentStatus.status === "FAILED" && (
        <dialog open>
          <header>
            <h1>결제 실패</h1>
          </header>
          <p>{paymentStatus.message}</p>
          <button type="button" onClick={handleClose}>
            닫기
          </button>
        </dialog>
      )}

      {paymentStatus.status === "PAID" && (
        <dialog open>
          <header>
            <h1>결제 성공</h1>
          </header>
          <p>결제에 성공했습니다.</p>
          <button type="button" onClick={handleClose}>
            닫기
          </button>
        </dialog>
      )}
    </>
  );
}
