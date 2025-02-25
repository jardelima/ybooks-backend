import { DataSource } from "typeorm";

import { User } from "./entity/user.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "172.19.0.2",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "ybooks",
    synchronize: true, // Em produção, defina como false e use migrações
    logging: true,
    entities: [User], // Defina as suas entidades aqui
    migrations: [],
    subscribers: [],
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Conexão com banco de dados feita com sucesso!");
    } catch (error) {
        console.log("Erro na conexão do banco de dados", error);
    }
};
