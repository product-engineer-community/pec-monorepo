import { notifyNewPostToDiscord } from "./discord";
import { NotifyChannel } from "../types";
import { NotifyNewPostOptions } from "./types";

export async function notifyPost(
  channels: NotifyChannel[],
  options: NotifyNewPostOptions,
) {
  for (const channel of channels) {
    if (channel === "discord") {
      await notifyNewPostToDiscord(options);
    }
  }
}
