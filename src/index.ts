import cors from "cors";
import express from "express";

import { initializeDatabase } from "./database/data-source";
// Routes
import books from "./routes/books/books-routes";
import users from "./routes/users/users-routes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", users);
app.use("/api", books);

// Iniciar o banco de dados
initializeDatabase();

app.listen(port, () => {
    console.log("Servidor rodando!");
});
