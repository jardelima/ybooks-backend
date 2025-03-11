import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Admin } from "@/database/entity/admin.entity";
import { hashPassword } from "@/helpers/hash-password";
import { AdminModel } from "@/models/admin.model";

export const registerAdmin = async (
    req: Request<object, object, AdminModel>,
    res: Response,
): Promise<Response> => {
    const adminRepository = AppDataSource.getRepository(Admin);

    try {
        const { user, password } = req.body;

        const userDuplicated = await adminRepository.findOneBy({ user });

        if (userDuplicated) {
            return res.status(400).json({ message: "Nome de usuário já cadastrado no sistema." });
        }

        const hashedPassword = await hashPassword(password);

        const newAdmin = new Admin();
        newAdmin.user = user;
        newAdmin.password = hashedPassword;
        newAdmin.is_admin = true;

        await adminRepository.save(newAdmin);

        return res.status(201).json({ message: "Administrador cadastrado com sucesso!" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erro ao tentar cadastrar administrador. \n", error });
    }
};
