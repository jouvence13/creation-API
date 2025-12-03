//Point d'entrer du serveur express
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todos.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
