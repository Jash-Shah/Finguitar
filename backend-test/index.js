const path = require("path");
const express = require("express");
const WebSocket = require("ws");
const app = express();

const WS_PORT = process.env.WS_PORT || 3001;
const HTTP_PORT = process.env.HTTP_PORT || 5000;

const wsServer = new WebSocket.Server({ port: WS_PORT }, () =>
  console.log(`WS server is listening at ws://localhost:${WS_PORT}`)
);

// array of connected websocket clients
let connectedClients = [];

wsServer.on("connection", (ws, req) => {
  console.log("Connected");
  // add new connected client
  connectedClients.push(ws);
  // listen for messages from the streamer, the clients will not send anything so we don't need to filter
  ws.on("message", (data) => {
    // send the base64 encoded frame to each connected ws
    connectedClients.forEach((ws, i) => {
      if (ws.readyState === ws.OPEN) {
        // check if it is still connected
        // let buf = Buffer.from(data, "base64"); // Ta-da
        // let decodedString = buf.toString("utf8");
        console.log(data);
        ws.send(data); // send
      } else {
        // if it's not connected remove from the array of connected ws
        connectedClients.splice(i, 1);
      }
    });
  });
});

app.listen(HTTP_PORT, () =>
  console.log(`HTTP server listening at http://localhost:${HTTP_PORT}`)
);
