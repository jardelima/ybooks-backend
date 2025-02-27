import { Router } from "express";

import { deleteBook } from "@/controllers/books/delete-book";
import { getAllBooks } from "@/controllers/books/get-all-books";
import { registerBook } from "@/controllers/books/register-book";
import { updateBook } from "@/controllers/books/update-book";

const router = Router();

router.get("/books", async (_, res) => {
    try {
        await getAllBooks(res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de ver todos livros. \n",
            error,
        });
    }
});

router.post("/books", async (req, res) => {
    try {
        await registerBook(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de registrar livro. \n",
            error,
        });
    }
});

router.delete("/books/:id", async (req, res) => {
    try {
        await deleteBook(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de remover livro. \n",
            error,
        });
    }
});

router.patch("/books/:id", async (req, res) => {
    try {
        await updateBook(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de atualizar livro. \n",
            error,
        });
    }
});

export default router;
