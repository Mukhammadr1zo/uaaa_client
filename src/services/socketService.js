// src/services/socketService.js
import { io } from 'socket.io-client';
import { serverUrl } from '@/config';

// Socket instance
let socket = null;

// Initialize Socket.IO connection
export const initSocket = () => {
  if (!socket) {
    // Socket.io client
    socket = io(serverUrl, {
      transports: ['websocket'],
      autoConnect: true
    });
    
    socket.on('connect', () => {
      console.log('Socket connected');
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
    
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }
  
  return socket;
};

// Join admin room for admin dashboard
export const joinAdminRoom = () => {
  const socket = getSocket();
  socket.emit('join_admin_room');
  console.log('Joined admin room');
};

// Get socket instance
export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default {
  initSocket,
  getSocket,
  disconnectSocket,
  joinAdminRoom
};