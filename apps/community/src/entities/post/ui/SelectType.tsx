import { getPostTypeDisplayName } from "@packages/constants";
import {
  PostType,
  postType as postTypeSchema,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@packages/ui";

interface SelectTypeProps {
  value: PostType;
  onValueChange: (value: PostType) => void;
  defaultValue?: PostType;
}

export function SelectType({
  value,
  onValueChange,
  defaultValue,
}: SelectTypeProps) {
  return (
    <>
      <Select
        value={value}
        onValueChange={onValueChange}
        defaultValue={defaultValue || ""}
        required
      >
        <SelectTrigger className="w-[140px] rounded border px-3 py-2">
          <SelectValue placeholder="게시판을 선택하세요" />
        </SelectTrigger>
        <SelectContent side="bottom" avoidCollisions={false}>
          {Object.values(postTypeSchema.Enum)
            .filter((type) => type !== "article")
            .map((type) => (
              <SelectItem key={type} value={type}>
                {getPostTypeDisplayName(type)}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <input type="hidden" name="category" value={value} />
    </>
  );
}
