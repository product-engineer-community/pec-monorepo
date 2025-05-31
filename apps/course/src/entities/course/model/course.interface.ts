// 강의 타입 정의
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  salePrice: number;
  duration: string;
  level: string;
  students: number;
  image: string;
  tags: string[];
}
