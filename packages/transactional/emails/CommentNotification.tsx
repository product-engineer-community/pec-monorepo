import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface CommentNotificationProps {
  postAuthorName: string;
  postTitle: string;
  commentUrl: string;
}

export default function CommentNotification({
  postAuthorName,
  postTitle,
  commentUrl,
}: CommentNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://www.productengineer.info/community/public/logo.webp`}
            width="48"
            height="48"
            alt="PEC Logo"
            style={logo}
          />
          <Text style={titleText}>새로운 댓글이 달렸습니다.</Text>
          <Section style={box}>
            <Text style={paragraph}>안녕하세요 {postAuthorName}님,</Text>
            <Text style={paragraph}>
              <strong>{postTitle}</strong> 게시글에 새로운 댓글이 달렸습니다.
            </Text>
            <Link style={button} href={commentUrl}>
              댓글 보러가기
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles (example, adjust as needed)
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #e6ebf1",
  borderRadius: "5px",
};

const logo = {
  margin: "0 auto",
};

const titleText = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "20px 0",
  color: "#333",
};

const box = {
  padding: "0 24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const quote = {
  color: "#525f7f",
  fontSize: "15px",
  lineHeight: "22px",
  textAlign: "left" as const,
  borderLeft: "3px solid #e6ebf1",
  paddingLeft: "12px",
  margin: "16px 0",
};

const button = {
  backgroundColor: "#0d4c86",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
  margin: "16px 0",
};
