import { Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Admin } from "@/database/entity/admin.entity";

const adminRepository = AppDataSource.getRepository(Admin);

export const getAllAdmins = async (res: Response): Promise<Response> => {
    try {
        const admins = await adminRepository.find();

        return res.status(200).json(admins);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao fazer a requisicão para pegar os administradores. \n",
            error,
        });
    }
};
