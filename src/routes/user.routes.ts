import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import bcrypty from "bcrypt";
import { User } from "../entity/User";

const userRouter = Router()

const userRepository = AppDataSource.getRepository(User)

userRouter.post("/", async (req: Request, res: Response) => {
    try {

        const bodyUser = req.body

        const salt = await bcrypty.genSalt(10)
        let senhaCrypto = await bcrypty.hash(bodyUser.senha, salt)

        bodyUser.senha = senhaCrypto

        await userRepository.save(bodyUser)
        res.status(201).json(bodyUser)
    } catch(error) {
        res.status(500).json("Não foi possível executar a solicitação.")
    }
})

export default userRouter