import { Router } from "express";

import { pickMostRented } from "@/controllers/rentals/pick-most-rented";
import { rentBook } from "@/controllers/rentals/rental-book";
import { returnBook } from "@/controllers/rentals/return-rental-book";
import { isAuth } from "@/middlewares/is-auth";

const router = Router();

router.post("/rent", isAuth, async (req, res) => {
    try {
        await rentBook(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de alugar livro. \n",
            error,
        });
    }
});

router.post("/return-rent", isAuth, async (req, res) => {
    try {
        await returnBook(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de devolver livro. \n",
            error,
        });
    }
});

router.get("/top-rented", async (_, res) => {
    try {
        await pickMostRented(res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de listar top três livros. \n",
            error,
        });
    }
});

export default router;
