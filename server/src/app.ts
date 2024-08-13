import express from 'express'
import cors from 'cors'
import 'express-async-errors';
import 'reflect-metadata';
import { errorHandler } from './middlewares'

import { userRouter } from "./routes"

export const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/users', userRouter)


app.use(errorHandler);

// app.listen(3000, () => {
//     console.log("Server is running on port: " + 3000)
// })