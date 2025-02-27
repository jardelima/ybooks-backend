import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entity/books.entity";
import { BookModel } from "@/models/book.model";

const bookRepository = AppDataSource.getRepository(Book);

export const updateBook = async (
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{ id: string }, {}, Partial<BookModel>>,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const { title, author, isbn } = req.body;

        const bookToUpdate = await bookRepository.findOneBy({ id });

        if (!bookToUpdate) {
            return res.status(404).json({ message: `Livro com ID ${id} não foi encontrado.` });
        }

        bookToUpdate.title = title || bookToUpdate.title;
        bookToUpdate.author = author || bookToUpdate.author;
        bookToUpdate.isbn = isbn || bookToUpdate.isbn;

        await bookRepository.save(bookToUpdate);

        return res.status(200).json({ message: "Livro atualizado com sucesso!", bookToUpdate });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao tentar atualizar o livro. \n", error });
    }
};
