import { COURSE_PATHNAME } from "@packages/constants";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@packages/ui";
import { Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Course } from "../model";

// 강의 아이템 컴포넌트
export function CourseItem({
  title,
  description,
  instructor,
  price,
  salePrice,
  duration,
  level,
  students,
  image,
  tags,
  id,
}: Course) {
  // 할인율 계산
  const discountRate = Math.round(((price - salePrice) / price) * 100);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        {discountRate > 0 && (
          <div className="absolute right-0 top-0 bg-red-500 px-2 py-1 text-xs font-bold text-white">
            {discountRate}% 할인
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-1 text-white">
            <User className="h-4 w-4" />
            <span className="text-xs">{students}명 수강 중</span>
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {level === "중급" && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                {level}
              </span>
            )}
            {level === "고급" && (
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
                {level}
              </span>
            )}
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="mr-1 h-3 w-3" />
              {duration}
            </span>
          </div>
        </div>
        <h3 className="line-clamp-2 text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{instructor}</p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="mb-2 flex items-center gap-2">
          {discountRate > 0 && (
            <span className="text-sm text-gray-500 line-through">
              {price.toLocaleString()}원
            </span>
          )}
          <span className="text-lg font-bold text-primary">
            {salePrice.toLocaleString()}원
          </span>
        </div>
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            asChild
            disabled={salePrice !== 132000}
          >
            <Link href={`${COURSE_PATHNAME}/${id}`}>상세보기</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="flex-1"
            disabled={salePrice !== 132000}
          >
            <Link href={`${COURSE_PATHNAME}/payment/${id}`}>수강신청</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
