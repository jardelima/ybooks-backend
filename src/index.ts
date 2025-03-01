import cors from "cors";
import express from "express";

import { initializeDatabase } from "./database/data-source";
// Routes
import admin from "./routes/admin/admin-routes";
import books from "./routes/books/books-routes";
import copys from "./routes/copys/copys-routes";
import login from "./routes/login/login-routes";
import users from "./routes/users/users-routes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", admin);
app.use("/api", users);
app.use("/api", books);
app.use("/api", copys);
app.use("/api", login);

// Iniciar o banco de dados
initializeDatabase();

app.listen(port, () => {
    console.log("Servidor rodando!");
});
