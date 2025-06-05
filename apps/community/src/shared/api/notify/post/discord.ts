import { getPostTypePathname } from "@packages/constants";

import { NotifyNewPostOptions } from "./types";

/**
 * "community-새글알림" 채널의 웹훅 URL입니다.
 */
const NEW_POST_NOTIFICATION_WEBHOOK_URL =
  process.env.NEW_POST_NOTIFICATION_WEBHOOK_URL || "";

/**
 * PEC 디스코드 채널의 "community-새글알림" 채널로 메시지를 전송하는 함수입니다.
 */
export function notifyNewPostToDiscord(options: NotifyNewPostOptions) {
  return notifyDiscord(
    NEW_POST_NOTIFICATION_WEBHOOK_URL,
    toNotifyNewPostDto(options),
  );
}

const toNotifyNewPostDto = (options: NotifyNewPostOptions) => {
  const { postId, title, content, type } = options;

  return {
    content: `${type}에 새 게시물이 작성되었어요!`,
    embeds: [
      {
        title: title.length > 20 ? title.slice(0, 20) + "..." : title,
        description:
          content.length > 50 ? content.slice(0, 50) + "..." : content,
        url: `https://www.productengineer.info/community/${getPostTypePathname(type)}/${postId}`,
        footer: {
          text: "Product Engineer Community",
        },
      },
    ],
  };
};

/**
 * 서비스 내에서 사용하는 필드에 비해서 실제 필드가 너무 많아서 타입의 일부만 느슨하게 정의합니다.
 * @see https://discord.com/developers/docs/resources/message#create-message
 */
interface Option {
  /**
   * @description 2,000자 까지 작성할 수 있습니다.
   */
  content?: string;
  /**
   * 정확한 타입은 https://discord.com/developers/docs/resources/message#embed-object 를 참고해주세요
   */
  embeds?: Array<{
    title: string;
    description: string;
    url: string;
    footer: {
      text: string;
    };
  }>;
}

/**
 * 웹훅을 사용하여 디스코드 채널로 메시지를 전송하는 함수입니다.
 */
async function notifyDiscord(webhookUrl: string, options: Option) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    throw new Error("디스코드 알림을 보낼 때 에러가 발생했어요.");
  }

  return response.json();
}
