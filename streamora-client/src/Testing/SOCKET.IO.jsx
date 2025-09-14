import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// backend api
const SERVER_URL = import.meta.env.VITE_BASE_URL;

const socket = io(SERVER_URL);

function SocketTesting() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    function onConnect() {
      console.log(`Connected to Socket.IO server! Connection ID is`, socket.id);
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
    <div className="p-6">
      <h1 className="text-3xl font-bold">Socket.IO Test</h1>
      <div className="mt-6 p-4 rounded-md bg-neutral-800 w-full max-w-sm">
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
    </div>
  );
}

export default SocketTesting;
