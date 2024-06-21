import {
  useChat,
  useDataChannel,
  useRemoteParticipants,
  useRoomContext,
} from "@livekit/components-react";
import { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "../App";

const CustomChat = ({ currentUser, setReceiver }) => {
  const dropdownSelectedValueRef = useRef("all");
  const roomInfo = useRoomContext();
  const [messages, setMessages] = useState([]);
  const participants = useRemoteParticipants([]);
  const socket = useContext(SocketContext);
  const { chatMessages } = useChat();

  // Initialize data channel for chat
  const { message } = useDataChannel(updateMessage);

  function updateMessage(message) {
    const decoder = new TextDecoder();
    const receivedMessage = JSON.parse(
      JSON.parse(decoder.decode(message.payload)).message
    );

    setMessages((prevMessages) => [receivedMessage]);

    const defaultEntry = document.querySelectorAll("li.lk-chat-entry");

    defaultEntry.forEach((entry) => entry.remove());
  }

  // When participants change, update the dropdown.
  useEffect(() => {
    updateChatDropdown();
  }, [participants]);

  useEffect(() => {
    const defaultEntry = document.querySelectorAll("li.lk-chat-entry");

    defaultEntry.forEach((entry) => entry.remove());
  }, [message]);

  useEffect(() => {
    const submitButton = document.querySelector(".lk-chat-form-button");
    if (submitButton) {
      submitButton.addEventListener("click", submitButtonEvent);
    }
    return () => {
      if (submitButton) {
        submitButton.removeEventListener("click", submitButtonEvent);
      }
    };
  }, []);

  function updateChatDropdown() {
    removeChatDropdown();
    addChatDropdown();
  }

  // Add dropdown for selecting message recipient
  function addChatDropdown() {
    const chatMessagesElement = document.querySelector(".lk-chat-messages");
    if (chatMessagesElement) {
      chatMessagesElement.insertAdjacentHTML(
        "afterend",
        `<div class="append-dropdown">
          <label>To:</label>
          <div class="dropdown-wrapper">
            <select>
              <option value="all">Everyone</option>
              ${participants
                .map(
                  (participant) =>
                    `<option value="${participant.sid}">${participant.identity}</option>`
                )
                .join("")}
            </select>
          </div>
        </div>`
      );

      const selectElement = document.querySelector(".append-dropdown select");
      if (selectElement) {
        selectElement.addEventListener("change", (e) => {
          dropdownSelectedValueRef.current = e.target.value;
          setReceiver([e.target.value]);
        });
      }
    }

    const chatButton = document.querySelector(".lk-chat-form-button");

    if (chatButton) {
      chatButton.setAttribute("type", "button");
    }
  }

  // Handle chat submit button event
  function submitButtonEvent() {
    const messageInput = document.querySelector(".lk-chat-form-input");
    if (messageInput) {
      const messageContent = messageInput.value;
      if (messageContent.trim() === "") return;

      const receiver =
        dropdownSelectedValueRef.current === "all"
          ? []
          : [dropdownSelectedValueRef.current];
      const chatMessage = {
        from: currentUser,
        to: receiver,
        content: messageContent,
        room: roomInfo.name,
        timestamp: new Date().toISOString(),
      };

      const encoder = new TextEncoder();
      const sendMessage = encoder.encode(JSON.stringify(chatMessage));

      socket.emit("send-message", sendMessage);
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
    }
  }

  // Remove existing dropdown to avoid duplicates
  function removeChatDropdown() {
    const existingDropdown = document.querySelector(".append-dropdown");
    if (existingDropdown) {
      existingDropdown.remove();
    }
  }
};

export default CustomChat;
