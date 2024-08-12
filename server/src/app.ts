import express from 'express'
import cors from 'cors'

import { userRouter } from "./routes"

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/users', userRouter)




app.listen(3000, () => {
    console.log("Server is running on port: " + 3000)
})