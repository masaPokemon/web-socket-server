import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket) =>
  // 受信したイベント全てを他のクライアントへブロードキャスト
  socket.onAny((event, data) => socket.broadcast.emit(event, data)),
);

// 環境変数からポート番号を読み込み、サーバーを起動
http.listen(Number(process.env.PORT) || 3000);
