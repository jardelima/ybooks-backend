import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Admin } from "@/database/entity/admin.entity";
import { hashPassword } from "@/helpers/hash-password";
import { AdminModel } from "@/models/admin.model";

const registerRepository = AppDataSource.getRepository(Admin);

export const registerAdmin = async (
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{}, {}, AdminModel>,
    res: Response,
): Promise<Response> => {
    try {
        const { user, password } = req.body;

        const userDuplicated = await registerRepository.findOneBy({ user });

        if (userDuplicated) {
            return res.status(400).json({ message: "Nome de usuário já cadastrado no sistema." });
        }

        const hashedPassword = await hashPassword(password);

        const newAdmin = new Admin();
        newAdmin.user = user;
        newAdmin.password = hashedPassword;
        newAdmin.is_admin = true;

        await registerRepository.save(newAdmin);

        return res.status(201).json({ message: "Administrador cadastrado com sucesso!" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erro ao tentar cadastrar administrador. \n", error });
    }
};
