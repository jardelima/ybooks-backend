import { Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { User } from "@/database/entity/user.entity";

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (res: Response): Promise<Response> => {
    try {
        const users = await userRepository.find();

        return res.status(200).json(users);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erro ao fazer a requisicão para pegar os usuários. \n", error });
    }
};
