import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"];

    if (!token) {
        res.status(401).json({ message: "Token não fornecido." });
        return;
    }

    try {
        const decoded = jwt.verify(token, "secretKey");

        if (decoded) {
            next();
        }
    } catch (error) {
        res.status(401).json({ message: "Token inválido ou expirado.", error });
    }
};
