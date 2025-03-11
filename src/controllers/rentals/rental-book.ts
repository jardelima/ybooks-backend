import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Copy } from "@/database/entity/copy.entity";
import { Rental } from "@/database/entity/rental.entity";
import { User } from "@/database/entity/user.entity";
import { RentalModel } from "@/models/rental.model";

export const rentBook = async (
    req: Request<object, object, RentalModel>,
    res: Response,
): Promise<Response> => {
    const userRepository = AppDataSource.getRepository(User);
    const copyRepository = AppDataSource.getRepository(Copy);
    const rentalRepository = AppDataSource.getRepository(Rental);

    try {
        const { userId, copyId } = req.body;

        if (!userId || !copyId) {
            return res.status(400).json({
                message: "É necessário fornecer o ID do usuário e da cópia do livro.",
            });
        }

        const userExist = await userRepository.findOne({ where: { id: userId } });
        const copyExist = await copyRepository.findOne({ where: { id: copyId } });

        if (!userExist) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        if (!copyExist) {
            return res.status(404).json({ message: "Cópia do livro não encontrada." });
        }

        if (copyExist.status === false) {
            return res.status(400).json({ message: "Cópia do livro não disponível." });
        }

        copyExist.status = false;
        await copyRepository.save(copyExist);

        const rental = rentalRepository.create({
            user: userExist,
            copy: copyExist,
            rentalDate: new Date(),
            returnDate: null,
            isActive: true,
        });

        await rentalRepository.save(rental);

        return res.status(200).json({ message: "Livro alugado com sucesso!" });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao fazer a requisicão para alugar o livro. \n",
            error,
        });
    }
};
