import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@packages/ui";

interface SelectCategoryProps {
  value: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
}

export function SelectCategory({
  value,
  onValueChange,
  defaultValue,
}: SelectCategoryProps) {
  return (
    <>
      <Select
        value={value}
        onValueChange={onValueChange}
        defaultValue={defaultValue || ""}
        required
      >
        <SelectTrigger className="w-[180px] rounded border px-3 py-2">
          <SelectValue placeholder="카테고리를 선택하세요" />
        </SelectTrigger>
        <SelectContent side="bottom" avoidCollisions={false}>
          <SelectItem value="question">질문</SelectItem>
          <SelectItem value="discussion">토론</SelectItem>
          <SelectItem value="retrospective">회고</SelectItem>
          <SelectItem value="introduction">소개</SelectItem>
          <SelectItem value="guide">가이드</SelectItem>
          <SelectItem value="etc">기타</SelectItem>
        </SelectContent>
      </Select>
      <input type="hidden" name="category" value={value} />
    </>
  );
}
