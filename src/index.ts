import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { BaseDatabase } from './database/BaseDatabase'
import { userRouter } from './router/userRouter'

dotenv.config()

const app = express()
//process.env.PORT ||
app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})


app.use("/users", userRouter)

//app.use("/posts", postRouter)

//https://bcrypt-generator.com/