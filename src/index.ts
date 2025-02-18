import "reflect-metadata";
import express from "express";
import cors from "cors"
import { AppDataSource } from "./data-source"

const app = express()

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import medicamentosRouter from "./routes/medicamento.routes";

app.use(cors())
app.use(express.json())

app.use("/users", userRouter)
app.use("/login", authRouter)
app.use("/medicamentos", medicamentosRouter)

AppDataSource.initialize().then(async () => {
    app.listen(3333, () => {
        console.log("O servidor está rodando em http://localhost:3333")
    })


}).catch(error => console.log(error))
