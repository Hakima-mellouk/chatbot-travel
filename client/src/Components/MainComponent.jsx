import React, { useState } from "react";
import ChatBotRobot from "./ChatbotComponent";
import io from "socket.io-client";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faComments, faMessage, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./styles/ChatBotStyles.css";

const socket = io("http://localhost:3000", { transports: ["websocket"] });
socket.connect(true);

function MainComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <div>
      
      <ChatBotRobot socket={socket} open={isChatOpen} />
      <div className="chat-toggler" onClick={toggleChat}>
        <FontAwesomeIcon icon={isChatOpen ? faArrowRight : faMessage} />
       
      </div>
      
    </div>
  );
}

export default MainComponent;
