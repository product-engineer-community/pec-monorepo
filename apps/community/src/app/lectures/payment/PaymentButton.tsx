"use client";

import { Button } from "@pec/shared";
import * as PortOne from "@portone/browser-sdk/v2";
import { useState } from "react";
import { toast } from "sonner";

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

export default function PaymentButton({
  price,
  orderName,
  payMethod,
  currency = "CURRENCY_KRW",
}: PaymentButtonProps) {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const handleClick = async () => {
    setIsPaymentLoading(true);
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
        toast.error(payment.message);
        return;
      }

      const completeResponse = await fetch(`/lectures/payment/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: payment?.paymentId,
        }),
      });

      if (completeResponse.ok) {
        const paymentComplete = await completeResponse.json();

        if (paymentComplete.status === "PAID") {
          toast.success("결제가 완료되었습니다.");
        }
      } else {
        toast.error(await completeResponse.text());
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "결제 처리 중 오류가 발생했습니다.",
      );
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isPaymentLoading}
        aria-busy={isPaymentLoading}
      >
        결제하기
      </Button>
    </>
  );
}
