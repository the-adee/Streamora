import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3001";

const socket = io(SERVER_URL);

import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    function onConnect() {
      console.log(`Connected to Socket.IO server! Your ID is`, socket.id);
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log(`Disconnected from SOCKET.IO server`);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <>
      <h1>Building Streamora</h1>
      <br />
      <h4>
        <i>in production</i>
      </h4>
      <div className="mt-8 p-4 rounded-md bg-gray-700 w-full max-w-sm">
        <p className="text-xl font-semibold">
          Connection Status&nbsp;<i>(Socket.IO)</i>
        </p>
        <p
          className={`mt-2 text-2xl font-bold ${
            isConnected ? "text-green-400" : "text-red-500"
          }`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </p>
      </div>
    </>
  );
}

export default App;
