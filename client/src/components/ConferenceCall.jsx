import { VideoConference } from "@livekit/components-react";

export default function ConferenceCall({ currentUser, receiver }) {
  return (
    <VideoConference
      chatMessageEncoder={(sendMessageData) => {
        sendMessageData.message = JSON.stringify({
          id: sendMessageData.id,
          message: sendMessageData.message,
          username: currentUser,
          sendTo: receiver,
        });
        const encoder = new TextEncoder();
        const uint8Array = encoder.encode(JSON.stringify(sendMessageData));
        return uint8Array;
      }}
    />
  );
}
