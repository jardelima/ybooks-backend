import { Request, Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entity/book.entity";
import { BookModel } from "@/models/book.model";

const bookRepository = AppDataSource.getRepository(Book);

export const registerBook = async (
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{}, {}, BookModel>,
    res: Response,
): Promise<Response> => {
    try {
        const { title, author, isbn } = req.body;

        const bookDuplicated = await bookRepository.findOneBy({ isbn });

        if (bookDuplicated) {
            return res.status(409).json({ message: "O livro informado já está cadastrado." });
        }

        const newBook = new Book();
        newBook.title = title;
        newBook.author = author;
        newBook.isbn = isbn;

        await bookRepository.save(newBook);

        return res.status(201).json({ message: "Livro cadastrado com sucesso!", newBook });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao tentar cadastrar o Livro. \n", error });
    }
};
