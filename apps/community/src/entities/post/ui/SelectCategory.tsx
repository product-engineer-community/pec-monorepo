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
        <SelectTrigger className="w-[200px] rounded border px-3 py-2">
          <SelectValue placeholder="카테고리를 선택하세요" />
        </SelectTrigger>
        <SelectContent side="bottom" avoidCollisions={false}>
          <SelectItem value="tech-dev">Tech & Dev</SelectItem>
          <SelectItem value="ai">AI</SelectItem>
          <SelectItem value="product">Product</SelectItem>
          <SelectItem value="growth">Growth</SelectItem>
          <SelectItem value="side-projects">Side Projects</SelectItem>
          <SelectItem value="collaboration">Collaboration</SelectItem>
          <SelectItem value="career">Career</SelectItem>
          <SelectItem value="culture">Culture</SelectItem>
          <SelectItem value="etc">Etc</SelectItem>
        </SelectContent>
      </Select>
      <input type="hidden" name="category" value={value} />
    </>
  );
}
