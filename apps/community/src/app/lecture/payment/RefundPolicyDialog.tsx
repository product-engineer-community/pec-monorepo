"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@packages/ui";
import { PropsWithChildren } from "react";

interface RefundPolicyDialogProps {
  title?: string;
}

export default function RefundPolicyDialog({
  children,
  title = "환불 정책",
}: PropsWithChildren<RefundPolicyDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="max-h-[60vh] overflow-y-auto py-4">
          <div className="space-y-4 text-sm">
            <h3 className="font-bold">1. 환불 신청 기간</h3>
            <p>
              - 결제일로부터 7일 이내: 전액 환불
              <br />
              - 강의 시작 후 1주일 이내: 수강료의 70% 환불
              <br />
              - 강의 시작 후 2주일 이내: 수강료의 50% 환불
              <br />- 강의 시작 후 2주일 이후: 환불 불가
            </p>

            <h3 className="font-bold">2. 환불 신청 방법</h3>
            <p>
              - 홈페이지 내 &quot;마이페이지 &gt; 수강 내역&quot;에서 환불 신청
              <br />- 고객센터(support@example.com)로 환불 요청 이메일 발송
            </p>

            <h3 className="font-bold">3. 환불 처리 기간</h3>
            <p>
              - 환불 신청 접수 후 영업일 기준 3~5일 내 처리
              <br />- 결제 수단에 따라 환불 처리 기간이 상이할 수 있음
            </p>

            <h3 className="font-bold">4. 불가항력적 사유에 의한 환불</h3>
            <p>
              질병, 사고, 기타 불가항력적인 사유로 수강이 불가능한 경우,
              증빙서류 제출 시 위 규정과 관계없이 수강 기간에 해당하는 수강료를
              제외한 금액을 환불 받을 수 있습니다.
            </p>

            <h3 className="font-bold">5. 기타 사항</h3>
            <p>
              - 무료 강의 또는 프로모션 코드로 할인받은 강의의 경우 별도의 환불
              정책이 적용될 수 있습니다.
              <br />- 환불 금액은 원결제 수단으로 환불됩니다.
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
