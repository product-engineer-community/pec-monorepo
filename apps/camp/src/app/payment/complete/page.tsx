"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function PaymentDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    async function confirm() {
      const response = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        router.push(`/fail?message=${json.message}&code=${json.code}`);
        return;
      }
    }
    confirm();
  }, [searchParams, router]);

  return (
    <div className="box_section">
      <h2 className="size-14">결제 성공</h2>
      <p>{`결제 금액: ${Number(
        searchParams.get("amount"),
      ).toLocaleString()}원`}</p>
    </div>
  );
}

function LoadingPaymentDetails() {
  return <div>결제 정보를 불러오는 중...</div>;
}

export default function PaymentComplete() {
  return (
    <div className="result wrapper">
      <Suspense fallback={<LoadingPaymentDetails />}>
        <PaymentDetails />
      </Suspense>
    </div>
  );
}
