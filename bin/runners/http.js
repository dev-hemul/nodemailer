// Імпорт налаштувань для підняття серверу

import http from 'http';
import server from "../../http/server.js";

export default function startServer() {
  const httpServer = http.createServer(server);
  const PORT = process.env.PORT || 8000;

  httpServer.listen(PORT, () => {
    console.log(`HTTP Server is running on port ${PORT}`);
  });
}