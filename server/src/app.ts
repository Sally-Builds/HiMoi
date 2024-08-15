import express, { NextFunction, Response, Request } from 'express'
import cors from 'cors'
import 'express-async-errors';
import 'reflect-metadata';
import { errorHandler } from './middlewares'
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import { userRouter } from "./routes"

const app = express();
export const server = createServer(app);
export const io = new Server(server);


app.use(cors());
app.use(express.json());

io.on("test", (socket: Socket) => {
    console.log(socket, 'socket')
    return socket
})

app.use((req: Request, res: Response, next: NextFunction) => {
    req.io = io;
})


app.use('/api/users', userRouter)


app.use(errorHandler);