import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import "../styles/AMQdemo.css";

const AMQDemo = () => {
  const [url, setUrl] = useState("ws://localhost:61614");
  const [myUserId, setMyUserId] = useState("guest1");
  const [sendTo, setSendTo] = useState("/topic/demo-chat");
  const [recvFrom, setRecvFrom] = useState("/topic/demo-chat");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [messageText, setMessageText] = useState("");
  const clientRef = useRef(null);

  useEffect(() => {
    // Postavljanje podrazumevanih vrednosti pri prvom renderu
    setUrl("ws://localhost:61614");
    setMyUserId("guest1");
    setSendTo("/topic/demo-chat");
    setRecvFrom("/topic/demo-chat");
  }, []);

  const handleConnect = () => {
    if (!connected) {
      const client = new Client({
        brokerURL: url,
        connectHeaders: {
          login: "tabllo_user",
          passcode: "tabllo12345",
        },
        onConnect: () => {
          setConnected(true);
          setConnectionStatus("Connected");
          if (recvFrom) {
            client.subscribe(recvFrom, (message) => {
              setMessages((prevMessages) => [
                ...prevMessages,
                `${message.headers.userId}: ${message.body}`,
              ]);
            });
          }
        },
        onDisconnect: () => {
          setConnected(false);
          setConnectionStatus("Disconnected");
        },
      });

      client.activate();
      clientRef.current = client;
    } else {
      clientRef.current?.deactivate();
    }
  };

  const handleSend = () => {
    if (clientRef.current && connected) {
      clientRef.current.publish({
        destination: sendTo,
        headers: { userId: myUserId },
        body: messageText,
      });
      setMessageText("");
    }
  };

  const chatFormStyles = {
    display: "block",
  };

  const closeChatForm = () => {
    chatFormStyles.display = "none";
  };

  return (
    <div>
      <h2>Demo app</h2>
      <p>Click on the button at the bottom of this page to open the chat form.</p>
      <p>
        ActiveMQ is used for message transfer, using STOMP over WebSocket.
      </p>
      <br />
      <label>
        URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        SendTo:
        <input
          type="text"
          value={sendTo}
          onChange={(e) => setSendTo(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        RecvFrom:
        <input
          type="text"
          value={recvFrom}
          onChange={(e) => setRecvFrom(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>Connection status: {connectionStatus}</label>
      <button onClick={handleConnect}>
        {connected ? "Disconnect" : "Connect"}
      </button>
      <br />
      <br />
      <h2>Messages:</h2>
      <p>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </p>

      <button className="open-button">Chat</button>

      <div className="chat-popup" id="chatForm" style={chatFormStyles}>
        <div className="form-container">
          <h1>Chat</h1>

          <label>
            <b>MyUserId:</b>
            <input
              type="text"
              value={myUserId}
              onChange={(e) => setMyUserId(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label>
            <b>Message</b>
            <textarea
              placeholder="Type message.."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              required
            />
          </label>

          <button className="btn" onClick={handleSend}>
            Send
          </button>
          <button
            type="button"
            className="btn cancel"
            onClick={closeChatForm}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export default AMQDemo;