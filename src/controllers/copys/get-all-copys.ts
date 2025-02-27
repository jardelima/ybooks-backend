import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entity/book.entity";
import { CopyModel } from "@/models/copy.model";

const bookRepository = AppDataSource.getRepository(Book);

export const getAllCopys = async (
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{ id: string }, {}, CopyModel>,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;

        const book = await bookRepository.findOneBy({ id });

        const copys = await bookRepository.findOne({
            where: { id },
            relations: ["copys"],
        });

        if (!copys || !book) {
            return res.status(404).json({ message: `O livro com ID ${id} não existe.` });
        }

        return res.status(201).json({
            message: `Aqui estão todas as cópias do livro ${book.title} cadastrada no sistema.`,
            copys,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Erro ao tentar listar cópias do livro. \n`, error });
    }
};
