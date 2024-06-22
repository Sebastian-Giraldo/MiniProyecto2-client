import socketIOClient from "socket.io-client";

/**
 * Socket connection
 */
export const socketServer = socketIOClient(
  "http://localhost:5000"
);