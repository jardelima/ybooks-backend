import cors from "cors";
import express, { Request, Response } from "express";

// Routes
import users from "./routes/users/users-routes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/users", users);

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log("Servidor rodando!");
});
