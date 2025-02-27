import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entity/books.entity";
import { Copy } from "@/database/entity/copy.entity";
import { CopyModel } from "@/models/copy.model";

const copyRepository = AppDataSource.getRepository(Copy);
const bookRepository = AppDataSource.getRepository(Book);

export const createCopy = async (
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{ id: string }, {}, CopyModel>,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;

        const bookToCopy = await bookRepository.findOneBy({ id });

        if (!bookToCopy) {
            return res.status(404).json({ message: `O livro com ID ${id} não existe.` });
        }

        const copy = new Copy();
        copy.status = true;
        copy.book = bookToCopy;

        await copyRepository.save(copy);

        return res
            .status(201)
            .json({ message: `Cópia do livro ${bookToCopy.title} cadastrada com sucesso!`, copy });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Erro ao tentar cadastrar cópia do livro. \n`, error });
    }
};
