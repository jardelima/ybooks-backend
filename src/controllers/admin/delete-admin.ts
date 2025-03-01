import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Admin } from "@/database/entity/admin.entity";

const adminRepository = AppDataSource.getRepository(Admin);

export const deleteAdmin = async (
    req: Request<{ id: string }>,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;

        const adminToRemove = await adminRepository.findOneBy({ id });

        if (!adminToRemove) {
            return res
                .status(404)
                .json({ message: `Administrador com ID ${id} não foi encontrado.` });
        }

        await adminRepository.remove(adminToRemove);

        return res.status(200).json({ message: "Administrador removido com sucesso!" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erro ao tentar remover o administrador. \n", error });
    }
};
