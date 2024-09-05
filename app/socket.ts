'use client';
// don't server render this. as per doc

import { io } from 'socket.io-client';

const URL = 'https://twitmatchplay-server.onrender.com';

export const socket = io(URL);
