import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entity/books.entity";
import { Copy } from "@/database/entity/copy.entity";
import { CopyModel } from "@/models/copy.model";

const bookRepository = AppDataSource.getRepository(Book);
const copyRepository = AppDataSource.getRepository(Copy);

export const updateCopy = async (
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{ id: string; copyId: string }, {}, CopyModel>,
    res: Response,
): Promise<Response> => {
    try {
        const { id, copyId } = req.params;
        const { status } = req.body;

        const book = await bookRepository.findOneBy({ id });

        const copys = await bookRepository.findOne({
            where: { id },
            relations: ["copys"],
        });

        if (!copys || !book) {
            return res.status(404).json({ message: `O livro com ID ${id} não existe.` });
        }

        const copy = copys.copys.find((copy) => copy.id === copyId);

        if (!copy) {
            return res.status(404).json({ message: `A cópia com ID ${id} não existe.` });
        }

        copy.status = status ? true : false;

        await copyRepository.save(copy);

        return res.status(200).json({
            message: `Cópia do livro ${book.title} alugada.`,
            copy,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Erro ao tentar atualizar cópia do livro. \n`, error });
    }
};
