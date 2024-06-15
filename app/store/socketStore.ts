import { Socket } from 'socket.io-client';
import { create } from 'zustand';

import { socket } from '../socket';

interface Store {
  socket: Socket;
}

const useSocket = create<Store>((set) => ({
  socket: socket
}));

export default useSocket;
