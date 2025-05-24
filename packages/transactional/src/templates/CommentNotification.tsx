import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface CommentNotificationProps {
  postAuthorName?: string;
  commenterName?: string;
  postTitle?: string;
  commentUrl?: string;
  commentContentSnippet?: string; // Renamed for clarity, maybe just a snippet
  baseUrl?: string; // For logo, etc.
  appName?: string;
}

const defaultProps: CommentNotificationProps = {
  postAuthorName: 'Valued User',
  commenterName: 'Someone',
  postTitle: 'your post',
  commentUrl: '#',
  commentContentSnippet: '',
  baseUrl: 'https://www.productengineer.info', // Replace with actual base URL if different
  appName: 'PEC', // Replace with actual app name
};

export const CommentNotification = ({
  postAuthorName = defaultProps.postAuthorName,
  commenterName = defaultProps.commenterName,
  postTitle = defaultProps.postTitle,
  commentUrl = defaultProps.commentUrl,
  commentContentSnippet = defaultProps.commentContentSnippet,
  baseUrl = defaultProps.baseUrl,
  appName = defaultProps.appName,
}: CommentNotificationProps) => {
  const previewText = `New comment on your post: ${postTitle}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* <Img
            src={`${baseUrl}/static/logo.png`} // Update path to your logo
            width="48"
            height="48"
            alt={`${appName} Logo`}
            style={logo}
          /> */}
          <Text style={titleText}>New Comment on Your Post!</Text>
          <Section style={box}>
            <Text style={paragraph}>Hi {postAuthorName},</Text>
            <Text style={paragraph}>
              You have a new comment on your post: "<strong>{postTitle}</strong>".
            </Text>
            <Text style={paragraph}>
              <strong>{commenterName}</strong> wrote:
            </Text>
            {commentContentSnippet && (
              <Text style={quote}>{commentContentSnippet}</Text>
            )}
            <Button
              style={button}
              href={commentUrl}
            >
              View Comment
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The {appName} Team
          </Text>
          <Hr style={hr} />
          <Link href={baseUrl} style={footerLink}>
            {appName}
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export default CommentNotification;

// Styles (example, adjust as needed)
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #e6ebf1',
  borderRadius: '5px',
};

const logo = {
  margin: '0 auto',
};

const titleText = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '20px 0',
  color: '#333',
};

const box = {
  padding: '0 24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const quote = {
  color: '#525f7f',
  fontSize: '15px',
  lineHeight: '22px',
  textAlign: 'left' as const,
  borderLeft: '3px solid #e6ebf1',
  paddingLeft: '12px',
  margin: '16px 0',
};

const button = {
  backgroundColor: '#007bff',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
  margin: '16px 0',
};

const footerLink = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center' as const,
};
