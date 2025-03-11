import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

import { AdminModel } from "@/models/admin.model";

// Secret keys
const accessTokenSecret = "secretKey";
const refreshTokenSecret = "refreshSecretKey";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            admin?: AdminModel; // Aqui você define que a requisição pode ter um 'user', que é um objeto do tipo User
        }
    }
}

export const isAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Token não fornecido." });
        return;
    }

    jwt.verify(token, accessTokenSecret, (err, decoded) => {
        if (err && err.name === "TokenExpiredError") {
            return refreshAcessToken(req, res);
        }

        if (err) {
            res.status(401).json({ message: "Token inválido.", error: err });
            return;
        }

        if (decoded) {
            const decodedAdmin = decoded as AdminModel;
            req.admin = decodedAdmin;
            next();
        }
    });
};

const refreshAcessToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh Token não fornecido." });
    }

    jwt.verify(
        refreshToken,
        refreshTokenSecret,
        (err: VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
            if (err) {
                return res.status(403).json({ message: "Refresh Token inválido ou expirado" });
            }

            const decodedUser = decoded as JwtPayload & AdminModel;

            const newAccessToken = jwt.sign(
                { id: decodedUser.user, isAdmin: decodedUser.isAdmin },
                accessTokenSecret,
                { expiresIn: "4h" },
            );

            res.status(200).json({ accessToken: newAccessToken });
        },
    );
};
