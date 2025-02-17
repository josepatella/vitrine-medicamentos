import "reflect-metadata";
import express from "express";
import cors from "cors"
import { AppDataSource } from "./data-source"

const app = express()

app.use(cors())
app.use(express.json())

AppDataSource.initialize().then(async () => {
    app.listen(3333, () => {
        console.log("O servidor está rodando em http://localhost:3333")
    })


}).catch(error => console.log(error))
