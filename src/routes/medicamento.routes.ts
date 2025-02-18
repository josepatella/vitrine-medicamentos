import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Medicamento } from "../entity/Medicamento";

const medicamentosRouter = Router()

const medicamentoRepository = AppDataSource.getRepository(Medicamento)

medicamentosRouter.post("/", async (req: Request, res: Response) => {
    try {
        const medBody = <Medicamento>req.body

        await medicamentoRepository.save(medBody)

        res.status(201).json(medBody)

    } catch (error) {
        res.status(500).json("Não foi possível executar a solicitação.")
    }
})

medicamentosRouter.get("/", async (req: Request, res: Response) => {
    try {
        const userId = Number(req.headers.userid)

        if(!userId){
            res.status(400).json("Necessário imformar o userId")
            return
        }

        const page = Number(req.query.page) ?? 1
        const limit = Number(req.query.limit) ?? 10

        const skip = page > 1 ? (page-1)*limit: 0

        const medicamentos = await medicamentoRepository.find({
            where:{
                userId: userId
            },
            skip: skip, 
            take: limit
        })

        if(!medicamentos) {
            res.status(200).json("Nenhum medicamento encontrado.")
            return
        }

        res.status(200).json(medicamentos)

    } catch (error) {
        res.status(500).json("Não foi possível executar a solicitação.")
    }
})

medicamentosRouter.get("/all", async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) ?? 1
        const limit = Number(req.query.limit) ?? 10

        const skip = page > 1 ? (page-1)*limit: 0

        const medicamentos = await medicamentoRepository.find({
            skip: skip, 
            take: limit
        })
        if(!medicamentos) {
            res.status(200).json("Nenhum medicamento encontrado.")
            return
        }
        res.status(200).json(medicamentos)

    } catch (error) {
        res.status(500).json("Não foi possível executar a solicitação.")
    }
})

medicamentosRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const medicamentos = await medicamentoRepository.findOne({
            where: {
                id: Number(req.params.id)
            }
        })

        if(!medicamentos) {
            res.status(200).json("Nenhum medicamento encontrado.")
            return
        }
        res.status(200).json(medicamentos)
    } catch (error) {
        res.status(500).json("Não foi possível executar a solicitação.")
    }
})

medicamentosRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)

        const userId = Number(req.headers.userid)

        if(!userId){
            res.status(400).json("Necessário imformar o userId")
            return
        }

        const medBody = <Medicamento> req.body

        const medicamento = await medicamentoRepository.findOne({
            where: {
                id: id,
                userId: userId
            }
        })

        if(!medicamento) {
            res.status(200).json("Nenhum medicamento encontrado.")
            return
        }

        Object.assign(medicamento, medBody)

        await medicamentoRepository.save(medicamento)

        res.status(200).json(medicamento)

    } catch (error) {
        res.status(500).json("Não foi possível executar a solicitação.")
    }
})

medicamentosRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)

        const medicamento = await medicamentoRepository.findOne({
            where: {
                id: id,
            }
        })

        if(!medicamento) {
            res.status(200).json("Nenhum medicamento encontrado.")
            return
        }

        await medicamentoRepository.delete(medicamento.id)
        
        res.status(200).json("Medicamento excluído com sucesso!")

    } catch (error) {
        res.status(500).json("Não foi possível executar a solicitação.")
    }
})

export default medicamentosRouter