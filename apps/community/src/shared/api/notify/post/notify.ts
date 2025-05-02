import { notifyNewPostToDiscord } from "./discord";
import { NotifyChannel } from "../types";
import { NotifyNewPostOptions } from "./types";
import { isProd } from "@/shared/utils";

export async function notifyPost(
  channels: NotifyChannel[],
  options: NotifyNewPostOptions,
) {
  if (!isProd()) {
    console.warn("알림은 production 환경에서만 보내도록 합니다.");
    return;
  }

  for (const channel of channels) {
    if (channel === "discord") {
      await notifyNewPostToDiscord(options);
    }
  }
}
