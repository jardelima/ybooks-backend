import { Router } from "express";

import { getAllUsers } from "../../controllers/users/get-all-users";
import { registerUser } from "../../controllers/users/register-user";

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

export default router;
