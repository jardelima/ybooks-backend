import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { User } from "@/database/entity/user.entity";

const userRepository = AppDataSource.getRepository(User);

export const deleteUser = async (
    req: Request<{ id: string }>,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;

        const userToRemove = await userRepository.findOneBy({ id });

        if (!userToRemove) {
            return res.status(404).json({ message: `Usuário com ID ${id} não foi encontrado.` });
        }

        await userRepository.remove(userToRemove);

        return res.status(200).json({ message: "Usuário removido com sucesso!", userToRemove });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao tentar remover o usuário. \n", error });
    }
};
