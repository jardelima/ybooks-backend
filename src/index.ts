import cors from "cors";
import express from "express";

import { initializeDatabase } from "./database/data-source";
// Routes
import users from "./routes/users/users-routes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/users", users);

// Iniciar o banco de dados
initializeDatabase();

app.listen(port, () => {
    console.log("Servidor rodando!");
});
