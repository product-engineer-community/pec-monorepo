import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Progress,
} from "@pec/shared";

import { getUserPoint } from "@/src/entities/point/action";
import {
  convertPointToEmoji,
  convertPointToPercent,
} from "@/src/entities/point/model";
import { getUserFromSupabase } from "@/src/shared/supabase/action";

export const DropdownMenuWithPoint = async () => {
  const user = await getUserFromSupabase();
  const point = await getUserPoint(user?.id ?? "");

  const percent = convertPointToPercent(point);
  const emoji = convertPointToEmoji(point);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <span className="rounded-md border-border p-3 text-sm font-medium transition-colors hover:bg-muted-foreground/10">
          {user?.user_metadata.username}
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
