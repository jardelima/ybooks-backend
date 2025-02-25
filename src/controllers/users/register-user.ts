import { Request, Response } from "express";

import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entity/user.entity";
import { UserModel } from "../../models/user.model";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{}, {}, UserModel>,
    res: Response,
): Promise<Response> => {
    try {
        const { cpf, name, birthday, address } = req.body;

        const newUser = new User();
        newUser.cpf = cpf;
        newUser.name = name;
        newUser.birthday = birthday;
        newUser.address = address;

        await userRepository.save(newUser);

        return res.status(201).json({ message: "Usuário cadastrado com sucesso!", newUser });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao tentar cadastrar o usuário. \n", error });
    }
};
