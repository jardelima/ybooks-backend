import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Copy } from "@/database/entity/copy.entity";
import { Rental } from "@/database/entity/rental.entity";
import { User } from "@/database/entity/user.entity";

export const returnBook = async (
    req: Request<object, object, { userId: string; copyId: string }>,
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

        const rental = await rentalRepository.findOne({
            where: { user: userExist, copy: copyExist, isActive: true },
        });

        if (!rental) {
            return res
                .status(404)
                .json({ message: "Não há aluguel ativo para esta cópia do livro." });
        }

        copyExist.status = true;
        await copyRepository.save(copyExist);

        rental.isActive = false;
        rental.returnDate = new Date();
        await rentalRepository.save(rental);

        return res.status(200).json({ message: "Livro devolvido com sucesso!" });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao processar a devolução do livro.",
            error,
        });
    }
};
