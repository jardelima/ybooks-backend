import { Response } from "express";

import { AppDataSource } from "@/database/data-source";
import { Copy } from "@/database/entity/copy.entity";
import { Rental } from "@/database/entity/rental.entity";
import { RentalModel } from "@/models/rental.model";

export const pickMostDelayed = async (res: Response): Promise<Response> => {
    const rentalRepository = AppDataSource.getRepository(Rental);

    try {
        const today = new Date();

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        const startOfYear = new Date(today.getFullYear(), 0, 1);

        // Busca para os livros mais atrasados do mês
        const rentalsOfMonth = await rentalRepository
            .createQueryBuilder("rental")
            .innerJoin("rental.copy", "copy")
            .innerJoin("copy.book", "book")
            .select("book.id", "bookId")
            .addSelect("book.title", "bookTitle")
            .addSelect("COUNT(rental.id)", "rentalCount")
            .where("rental.returnDate < :today", { today }) // Atrasados
            .andWhere("rental.rentalDate >= :startOfMonth", { startOfMonth })
            .andWhere("rental.rentalDate <= :endOfMonth", { endOfMonth })
            .groupBy("book.id")
            .orderBy("COUNT(rental.id)", "DESC")
            .limit(3) // Top 3 mais atrasados no mês
            .getRawMany();

        // Busca para os livros mais atrasados do ano
        const rentalsOfYear = await rentalRepository
            .createQueryBuilder("rental")
            .innerJoin("rental.copy", "copy")
            .innerJoin("copy.book", "book")
            .select("book.id", "bookId")
            .addSelect("book.title", "bookTitle")
            .addSelect("COUNT(rental.id)", "rentalCount")
            .where("rental.returnDate < :today", { today }) // Atrasados
            .andWhere("rental.returnDate IS NOT NULL") // Deve ter devolução
            .andWhere("rental.rentalDate >= :startOfYear", { startOfYear })
            .groupBy("book.id")
            .orderBy("COUNT(rental.id)", "DESC")
            .limit(3) // Top 3 mais atrasados no ano
            .getRawMany();

        // Função para pegar detalhes do livro
        const getBookDetails = async (rentalData: Array<RentalModel>) => {
            return await Promise.all(
                rentalData.map(async (rental) => {
                    // Buscando a cópia do livro pelo ID da cópia
                    const copy = await AppDataSource.getRepository(Copy).findOne({
                        where: { id: rental.copyId },
                        relations: ["book"],
                    });

                    if (!copy) {
                        // Caso a cópia não exista, retornamos um objeto vazio
                        return { book: null, rentalCount: 0 };
                    }

                    // Agora pegamos o livro associado à cópia
                    const book = copy.book;

                    // Podemos contar quantos aluguéis o livro teve ou realizar outra lógica desejada
                    const rentalCount = rentalData.filter((r) => r.copyId === rental.copyId).length; // Exemplo de contagem de aluguéis para esse livro

                    return { book, rentalCount };
                }),
            );
        };

        const topDelayedBooksOfMonth = await getBookDetails(rentalsOfMonth);
        const topDelayedBooksOfYear = await getBookDetails(rentalsOfYear);

        if (topDelayedBooksOfMonth.length === 0 && topDelayedBooksOfYear.length === 0) {
            return res.status(404).json({ message: "Nenhum livro atrasado encontrado." });
        }

        return res.status(200).json({
            message: "Top 3 livros mais atrasados.",
            data: {
                topDelayedBooksOfMonth,
                topDelayedBooksOfYear,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao tentar listar os livros mais atrasados.",
            error,
        });
    }
};
