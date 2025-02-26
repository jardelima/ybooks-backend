import { Router } from "express";

import { deleteUser } from "@/controllers/users/delete-user";
import { getAllUsers } from "@/controllers/users/get-all-users";
import { registerUser } from "@/controllers/users/register-user";
import { updateUser } from "@/controllers/users/update-user";

const router = Router();

router.get("/users", async (_, res) => {
    try {
        await getAllUsers(res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de ver todos usuário. \n",
            error,
        });
    }
});

router.post("/users", async (req, res) => {
    try {
        await registerUser(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de cadastrar usuário. \n",
            error,
        });
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        await deleteUser(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de remover usuário. \n",
            error,
        });
    }
});

router.patch("/users/:id", async (req, res) => {
    try {
        await updateUser(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de remover usuário. \n",
            error,
        });
    }
});

export default router;
