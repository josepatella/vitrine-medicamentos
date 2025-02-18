import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import bcrypty from "bcrypt";
import { User } from "../entity/User";

const authRouter = Router()

const userRepository = AppDataSource.getRepository(User)

authRouter.post("/", async (req: Request, res: Response) => {
    try {

        const bodyUser = req.body

        const user = await userRepository.findOne({
            where:{
                email: bodyUser.eamil
            }
        })

        if(!user){
            res.status(401).json("Usuário ou senha inválido!")
            return
        }

        const validado = await bcrypty.compare(bodyUser.senha, user.senha)

        if(validado){
            res.status(200).json({userId: user.id})
            return
        } else {
            res.status(401).json("Não autorizado.")
        }

    } catch(error) {
        res.status(500).json("Não foi possível executar a solicitação.")
    }
})

export default authRouter