import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Connect to Socket.io server
const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages from server
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Send message to server
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(""); // Clear input field after sending
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
