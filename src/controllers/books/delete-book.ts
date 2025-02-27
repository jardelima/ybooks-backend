import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entity/books.entity";

const bookRepository = AppDataSource.getRepository(Book);

export const deleteBook = async (
    req: Request<{ id: string }>,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;

        const bookToRemove = await bookRepository.findOneBy({ id });

        if (!bookToRemove) {
            return res.status(404).json({ message: `Livro com ID ${id} não foi encontrado.` });
        }

        await bookRepository.remove(bookToRemove);

        return res.status(200).json({ message: "Livro removido com sucesso!", bookToRemove });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao tentar remover o Livro. \n", error });
    }
};
