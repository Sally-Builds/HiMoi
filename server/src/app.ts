import express, { NextFunction, Response, Request } from 'express'
import cors from 'cors'
import 'express-async-errors';
import 'reflect-metadata';
import { errorHandler } from './middlewares'
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import { chatRouter, userRouter } from "./routes"

const app = express();
export const server = createServer(app);
export const io = new Server(server);


app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    req.io = io;
    next();
})

// io.on("connection", (socket: Socket) => {

//     console.log('socket')
//     socket.on("me", (msg) => {
//         io.emit("hello", msg)
//         console.log('received', msg)
//     })

//     socket.on("you", (msg) => {
//         io.emit("hello", msg)
//         console.log('received', msg)
//     })
//     // return socket
// })



app.use('/api/users', userRouter)
app.use('/api/chat', chatRouter)


app.use(errorHandler);