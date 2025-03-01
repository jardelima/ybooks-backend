import { Router } from "express";

import { deleteAdmin } from "@/controllers/admin/delete-admin";
import { getAllAdmins } from "@/controllers/admin/get-all-admins";
import { registerAdmin } from "@/controllers/admin/register-admin";

const router = Router();

router.get("/admin", async (_, res) => {
    try {
        await getAllAdmins(res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de listar livros. \n",
            error,
        });
    }
});

router.post("/admin", async (req, res) => {
    try {
        await registerAdmin(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de registrar livro. \n",
            error,
        });
    }
});

router.delete("/admin/:id", async (req, res) => {
    try {
        await deleteAdmin(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de atualizar livro. \n",
            error,
        });
    }
});

export default router;
