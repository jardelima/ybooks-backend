import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { User } from "@/database/entity/user.entity";
import { UserModel } from "@/models/user.model";

const userRepository = AppDataSource.getRepository(User);

export const updateUser = async (
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{ id: string }, {}, Partial<UserModel>>,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const { cpf, name, birthday, address } = req.body;

        const userToUpdate = await userRepository.findOneBy({ id });

        if (!userToUpdate) {
            return res.status(404).json({ message: `Usuário com ID ${id} não foi encontrado.` });
        }

        userToUpdate.cpf = cpf || userToUpdate.cpf;
        userToUpdate.name = name || userToUpdate.name;
        userToUpdate.birthday = birthday || userToUpdate.birthday;
        userToUpdate.address = address || userToUpdate.address;

        await userRepository.save(userToUpdate);

        return res.status(200).json({ message: "Usuário atualizado com sucesso!", userToUpdate });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao tentar atualizar o usuário. \n", error });
    }
};
