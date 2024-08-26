import express, { NextFunction, Response, Request } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import 'reflect-metadata';
import { errorHandler } from './middlewares'
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { redis_client } from '.';

import { chatRouter, eventRouter, userRouter } from "./routes"
import { Token, verifyToken, CustomError } from './helpers/lib/App';
import { UserModel } from './models';

const app = express();
export const server = createServer(app);
export const io = new Server(server);


app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    req.io = io;
    next();
})

io.use(async (socket, next) => {
    const token = socket.handshake.headers.token as string; // Token sent during the handshake
    console.log(socket.id)

    if (!token) {
        return next(new Error('Authentication error'));
    }

    const accessPayload: Token | jwt.JsonWebTokenError = await verifyToken(token)

    if (accessPayload instanceof jwt.JsonWebTokenError) {
        return next(new CustomError({ message: 'access token invalid', code: 401, ctx: { data: 'invalid bearer token' } }))
    }

    const user = await UserModel.findOne({ _id: accessPayload.id }, { __v: 0, password: 0 })

    if (!user) {
        return next(new CustomError({ message: 'access token invalid.', code: 401, ctx: { data: 'invalid bearer token' } }))
    }


    socket.user = user; // Attach decoded user to the socket
    const client = await redis_client.getRedisClient()
    client.set(user.id, socket.id)
    console.log('saved socket id', socket.id)
    next();
});


io.on("connection", (socket: Socket) => {

    console.log('connected', socket.id)

    // console.log('socket', socket.user)
    // socket.on("me", (msg) => {
    //     io.emit("hello", msg)
    //     console.log('received', msg)
    // })

    // socket.on("you", (msg) => {
    //     io.emit("hello", msg)
    //     console.log('received', msg)
    // })
})

// io.on('di')



app.use('/api/users', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/events', eventRouter)


app.use(errorHandler);