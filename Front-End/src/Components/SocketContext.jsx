import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

// Create a socket instance
const socket = io('https://rr-back-end.onrender.com');

// Create a Context
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);
