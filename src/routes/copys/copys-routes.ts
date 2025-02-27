import { Router } from "express";

import { createCopy } from "@/controllers/copys/create-copy";
import { deleteCopy } from "@/controllers/copys/delete-copy";
import { getAllCopys } from "@/controllers/copys/get-all-copys";
import { updateCopy } from "@/controllers/copys/update-copy";

const router = Router();

router.get("/get-copys/:id", async (req, res) => {
    try {
        await getAllCopys(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de listar cópias do livro. \n",
            error,
        });
    }
});

router.post("/create-copy/:id", async (req, res) => {
    try {
        await createCopy(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de cadastrar uma cópia do livro. \n",
            error,
        });
    }
});

router.delete("/delete-copy/:id/copy/:copyId", async (req, res) => {
    try {
        await deleteCopy(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de deletar uma cópia do livro. \n",
            error,
        });
    }
});

router.patch("/update-copy/:id/copy/:copyId", async (req, res) => {
    try {
        await updateCopy(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de atualizar uma cópia do livro. \n",
            error,
        });
    }
});

export default router;
