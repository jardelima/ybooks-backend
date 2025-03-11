import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppDataSource } from "@/database/data-source";
import { Admin } from "@/database/entity/admin.entity";
import { verifyPassword } from "@/helpers/verify-password";
import { LoginModel } from "@/models/login.model";

const adminRepository = AppDataSource.getRepository(Admin);

export const login = async (
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{}, {}, LoginModel>,
    res: Response,
): Promise<Response> => {
    try {
        const { user, password } = req.body;

        const userToLogin = await adminRepository.findOne({ where: { user } });

        if (!userToLogin) {
            return res.status(404).json({ message: "Usuário não encontrado no sistema." });
        }

        const passwordIsValid = await verifyPassword(userToLogin.password, password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        const token = jwt.sign({ id: userToLogin.id, isAdmin: userToLogin.is_admin }, "secretKey", {
            expiresIn: "8h",
        });

        const refreshToken = jwt.sign(
            { id: userToLogin.id, isAdmin: userToLogin.is_admin },
            "secretKey",
            {
                expiresIn: "7d",
            },
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res
            .status(200)
            .json({ message: "Login realizado com sucesso!", token, refreshToken });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao tentar realizar o login. \n", error });
    }
};
