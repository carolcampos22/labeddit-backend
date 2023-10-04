import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { BaseDatabase } from './database/BaseDatabase'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter'
import { commentsRouter } from './router/CommentsRouter'

dotenv.config()

const app = express()
//process.env.PORT ||
app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})


app.use("/users", userRouter)

app.use("/posts", postRouter)

app.use("/comments", commentsRouter)


//https://bcrypt-generator.com/
//ChatGPT: LABEDDIT
//https://dbdiagram.io/d/INTEGRADOR-64f3741502bd1c4a5edacf77
