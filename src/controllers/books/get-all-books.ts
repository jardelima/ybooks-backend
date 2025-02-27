import { Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entity/book.entity";

const bookRepository = AppDataSource.getRepository(Book);

export const getAllBooks = async (res: Response): Promise<Response> => {
    try {
        const books = await bookRepository.find();

        return res.status(200).json(books);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Erro ao fazer a requisicão para listar todos os livros. \n", error });
    }
};
