"use client";

import { useAuth } from "@packages/auth";
import { LECTURE_PATHNAME } from "@packages/constants";
import { Button } from "@packages/ui";
import * as PortOne from "@portone/browser-sdk/v2";
import { useState } from "react";
import { toast } from "sonner";

import RefundPolicyDialog from "./RefundPolicyDialog";

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
  const [isRefundPolicyAgreed, setIsRefundPolicyAgreed] = useState(false);

  const { getSession } = useAuth();

  const handleClick = async () => {
    if (!isRefundPolicyAgreed) {
      toast.error("환불정책에 동의해주세요.");
      return;
    }

    setIsPaymentLoading(true);
    const paymentId = crypto.randomUUID();

    const session = await getSession();

    try {
      const payment = await PortOne.requestPayment({
        storeId: "store-0c30bf7a-b560-4d50-bf82-bb65844b5990",
        channelKey: "channel-key-3b9c9060-eb0e-41b3-ae72-e31b9342bb51",
        paymentId,
        orderName,
        totalAmount: price,
        currency,
        payMethod,
        customer: {
          customerId: session?.user?.id,
          email: session?.user?.email,
        },
        customData: { id: "nextjs", price, currency },
      });

      if (payment?.code !== undefined) {
        toast.error(payment.message);
        return;
      }

      const completeResponse = await fetch(
        `${LECTURE_PATHNAME}/payment/complete`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: payment?.paymentId,
          }),
        },
      );

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
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="refund-policy-checkbox"
          checked={isRefundPolicyAgreed}
          onChange={(e) => setIsRefundPolicyAgreed(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="refund-policy-checkbox" className="text-sm">
          <RefundPolicyDialog>
            <span className="cursor-pointer text-blue-500 underline">
              (필수) 환불정책
            </span>
          </RefundPolicyDialog>
          에 동의합니다.
        </label>
      </div>

      <Button
        onClick={handleClick}
        disabled={isPaymentLoading}
        aria-busy={isPaymentLoading}
        className="w-full"
      >
        결제하기
      </Button>
    </div>
  );
}
