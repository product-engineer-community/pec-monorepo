import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@packages/ui";
import Image from "next/image";

import { getCourseItems, getCourses } from "@/entities/course/action";

import PaymentButton from "../PaymentButton";

interface PaymentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = await params;

  const courses = await getCourses();
  const course = courses[0];
  const CourseItems = await getCourseItems();
  console.log("🚀 ~ PaymentPage ~ CourseItems:", CourseItems);

  // 할인율 계산
  const discountRate = Math.floor(
    ((course.price - course.salePrice) / course.price) * 100,
  );

  // 할인 금액
  const discountAmount = course.price - course.salePrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* 왼쪽: 결제 양식 */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>결제 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* 개인 정보 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">구매자 정보</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" placeholder="홍길동" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">전화번호</Label>
                      <Input id="phone" placeholder="010-1234-5678" required />
                    </div>
                  </div>
                </div>

                <PaymentButton
                  price={course.salePrice}
                  orderName={course.title}
                  payMethod="CARD"
                />
              </form>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽: 주문 요약 */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>주문 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500">
                    강사: {course.instructor} 수강 기간: {course.duration}
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span>강의 정가</span>
                  <span>{course.price.toLocaleString()}원</span>
                </div>
                {discountRate > 0 && (
                  <div className="flex justify-between text-sm text-red-600">
                    <span>할인 금액 ({discountRate}%)</span>
                    <span>-{discountAmount.toLocaleString()}원</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                  <span>총 결제 금액</span>
                  <span>{course.salePrice.toLocaleString()}원</span>
                </div>
              </div>

              <div className="mt-6 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                <p>강의 구매 후 바로 수강하실 수 있습니다.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
