import { Router } from "express";

import { login } from "@/controllers/login/login";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        await login(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao processar a requisicão de login. \n",
            error,
        });
    }
});

export default router;
