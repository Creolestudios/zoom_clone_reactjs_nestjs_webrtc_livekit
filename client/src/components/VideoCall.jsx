import "@livekit/components-styles";
import {
  Chat,
  LayoutContextProvider,
  LiveKitRoom,
  useRoomInfo,
} from "@livekit/components-react";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { socketConnection } from "../socket.js";
import ConferenceCall from "./ConferenceCall.jsx";
import CustomChat from "./CustomChat.jsx";
import { SocketContext } from "../App.js";
// import CustomChat from "./CustomChat.jsx";

const serverUrl = "http://localhost:7880";

export default function VideoCall() {
  const data = useLocation();
  const [token, setToken] = useState(null);
  const [userConnected, setUserConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [receiver, setReceiver] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("create-token", data.state.data, (data) => {
      setToken(data);
    });
    setCurrentUser(data.state.data.username);
  }, []);

  if (token) {
    return (
      <div className="app-container">
        <div className="video-call">
          <LayoutContextProvider>
            <LiveKitRoom
              video={data.state.data.videoEnabled}
              audio={data.state.data.audioEnabled}
              token={token}
              serverUrl={serverUrl}
              data-lk-theme="default"
              style={{ height: "100vh" }}
              onConnected={() => {
                setUserConnected(!userConnected);
              }}
            >
              <CustomChat currentUser={currentUser} setReceiver={setReceiver} />
              <ConferenceCall
                currentUser={currentUser}
                receiver={receiver}
              ></ConferenceCall>
            </LiveKitRoom>
          </LayoutContextProvider>
        </div>
      </div>
    );
  }
  return <p>Loading..</p>;
}
