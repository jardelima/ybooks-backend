import { Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entity/book.entity";
import { Rental } from "@/database/entity/rental.entity";

export const pickMostRented = async (res: Response): Promise<Response> => {
    const rentalRepository = AppDataSource.getRepository(Rental);
    const bookRepository = AppDataSource.getRepository(Book);

    try {
        // Obter a data de início e fim do mês atual
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        // Contar o número de aluguéis feitos por cada livro no mês atual
        const rentals = await rentalRepository
            .createQueryBuilder("rental")
            .innerJoin("rental.copy", "copy") // Juntando a tabela Copy com a Rental
            .innerJoin("copy.book", "book") // Juntando a tabela Book com a Copy
            .select("book.id", "bookId") // Selecionando o ID do livro
            .addSelect("book.title", "bookTitle") // Selecionando o título do livro
            .addSelect("COUNT(rental.id)", "rentalCount") // Contando o número de aluguéis por livro
            .where("rental.rentalDate >= :startOfMonth", { startOfMonth }) // Aluguéis a partir do início do mês
            .andWhere("rental.rentalDate <= :endOfMonth", { endOfMonth }) // Aluguéis até o fim do mês
            .groupBy("book.id") // Agrupando pelos IDs dos livros
            .orderBy("COUNT(rental.id)", "DESC") // Ordenando pela contagem de aluguéis (decrescente)
            .limit(3) // Limitando para os 3 mais alugados
            .getRawMany(); // Executa a consulta e retorna o resultado como dados brutos

        const topThreeBooks = await Promise.all(
            rentals.map(async (rental) => {
                const book = await bookRepository.findOne({ where: { id: rental.bookId } });
                return { book, rentalCount: rental.rentalCount };
            }),
        );

        if (topThreeBooks.length === 0) {
            return res.status(404).json({ message: "Nenhum livro alugado encontrado." });
        }

        return res.status(200).json({
            message: "Top 3 livros mais alugados.",
            data: topThreeBooks,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao tentar listar os livros mais alugados.",
            error,
        });
    }
};
