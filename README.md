# Zoom Clone Reactjs Nestjs Webrtc Livekit

Project Overview:

1. Technology Stack:

   - **Frontend Framework**: React.js
   - **Backend Framework**: Nest.js

2. Development Environment:

   - **Version Control**: Git

3. Additional Considerations:

   - **Modular Structure**: React.js Page routes are organized in a modular structure.

## Table of Contents

- [Dependencies](#Dependencies)
- [Getting Started](#GettingStarted)
- [Configuration](#Configuration)
- [Usage](#Usage)
- [Notes](#Notes)

## Dependencies

- `LiveKit:` Build and scale voice and video applications for conversational AI, robotics, and livestreaming.
- `Socket.IO:` Used for Real-time data collection and Inter-Process Communication (IPC).

## Getting Started

**Step 1: Clone the Repository**

```
- git clone https://github.com/Creolestudios/zoom_clone_reactjs_nestjs_webrtc_livekit.git
```

Goto the directory

**Step 2: Navigate to the Project Directory**

```bash
cd zoom_clone_reactjs_nestjs_webrtc_livekit
```

**Step 3: Client and Server Setup**

**Run the Client:**

```bash
npm install
npm start
```

**Run the server:**

```bash
npm install
npm run dev
```

## Usage

1. Live Video call conferencing:

   - Live video call conferencing with your contacts.

2. Screen sharing:

   - Use the smooth screen sharing.

3. Chat during the video call:

   - Utilize the seamless chat feature during video calls.

## How we use LiveKit in server side

The following code snippet demonstrates how to create a token, which is required for a user to join a conference call.

```ts
 async createToken(data) {
    const roomName = 'first-room';

    let token: any = new AccessToken();

    token.addGrant({ room: roomName, roomJoin: true });

    token = await token.toJwt();
    return token;
  }
```

The createToken function generates an access token for a video conference room named 'first-room'. It follows these steps:

1. Defines the room name.
2. Creates a new AccessToken object.
3. Adds a grant to the token, allowing it to join the specified room.
4. Converts the token to a JSON Web Token (JWT).
5. Returns the JWT token.

This token can then be used by clients to authenticate and join the specified room in the video conference system.

Ensure that you have the necessary dependencies installed and configured before running the code. This token will authenticate and authorize the user for participation in the conference call.

## How use VideoConference Component

The VideoConference ready-made component is your drop-in solution for a classic video conferencing application. It provides functionality such as focusing on one participant, grid view with pagination to handle large numbers of participants, basic non-persistent chat, screen sharing, and more.

**Importing components:**

```jsx
import { VideoConference } from "@livekit/components-react";
```

This line imports the VideoConference component from the @livekit/components-react library, which is used for handling video conferences.

**Defining the ConferenceCall Component:**

```jsx
export default function ConferenceCall({ currentUser, receiver }) {}
```

This defines a React functional component named ConferenceCall. It takes currentUser and receiver as props.

**Rendering the VideoConference Component:**

```jsx
return <VideoConference />;
```

The component renders the VideoConference component.

The ConferenceCall component is designed to handle video conferencing with chat functionality. It uses the VideoConference component from the @livekit/components-react library. The chatMessageEncoder function is used to format and encode chat messages before they are sent, including information about the sender and receiver.

**Remarks**
The component is implemented with other LiveKit components like **FocusContextProvider**, **GridLayout**, **ControlBar**, **FocusLayoutContainer** and **FocusLayout**. You can use this components as a starting point for your own custom video conferencing application.

**Properties**

1. **chatMessageDecoder (MessageDecoder, Optional)**

   A utility responsible for decoding incoming chat messages. It takes encoded messages and translates them into a readable format for the application to process. This component is optional, meaning the chat application can function without it, but having it enhances the ability to handle various encoded message formats.

2. **chatMessageEncoder (MessageEncoder, Optional)**

   A utility responsible for encoding outgoing chat messages. It converts plain text or structured messages into a specific format suitable for transmission over the network. This component is also optional, indicating that while the application can operate without explicit encoding, utilizing this component can ensure messages are properly formatted for different communication protocols.

3. **chatMessageFormatter (MessageFormatter, Optional)**

   A utility for formatting chat messages. It takes decoded or raw messages and applies formatting rules (such as styling, parsing emoticons, etc.) to enhance readability and presentation within the chat interface. Being optional, it suggests that the application can display messages without special formatting, but this component can significantly improve the user experience by making messages more visually appealing.

4. **SettingsComponent (React.ComponentType, Optional)**

   A React component type that represents the settings interface of the chat application. This component allows users to configure various chat-related settings, such as notification preferences, theme choices, and other customization options. It is optional, indicating that the chat application can work with default settings but offering this component provides users with greater control over their chat environment.

## Notes

If you would like to see a visual representation of our application, check the attached video: [click here](https://drive.google.com/file/d/1A5PvX_UMklqRoREPsKTBI0hl-E-288Hn/view?usp=drive_link)
