import { Response, Router } from "express";

const router = Router();

router.get("/", (_, res: Response) => {
    try {
        const users = [
            {
                name: "Teste",
            },
        ];

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
