import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const initializeSocket = (server: HttpServer) => {
  
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  const io = new Server(server, {
    cors: {
      origin: frontendUrl,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};
