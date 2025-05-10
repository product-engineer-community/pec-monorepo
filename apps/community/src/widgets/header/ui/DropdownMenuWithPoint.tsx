import { getUserFromSupabase } from "@packages/supabase";
import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Progress,
} from "@packages/ui";

import { getUserPoint } from "@/src/entities/point/action";
import {
  convertPointToEmoji,
  convertPointToPercent,
} from "@/src/entities/point/model";

export const DropdownMenuWithPoint = async () => {
  const user = await getUserFromSupabase();
  const point = await getUserPoint(user?.id ?? "");

  const percent = convertPointToPercent(point);
  const emoji = convertPointToEmoji(point);
  const userName =
    user?.user_metadata.username || user?.user_metadata.full_name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <span className="rounded-md border-border p-3 text-sm font-medium transition-colors hover:bg-muted-foreground/10">
          {userName} 님
        </span>
        <Badge className="prl-2 pr-2">Level {emoji}</Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex justify-center gap-1 text-sm font-medium">
          <span>
            {emoji} 나의 포인트 {emoji}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Progress value={percent} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
