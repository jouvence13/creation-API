import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis .env
dotenv.config();

const router = express.Router();

// Connexion à Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,       // URL de ton projet Supabase
    process.env.SUPABASE_SERVICE_KEY // Clé secrète Service Role Key
);




router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });

    res.json(data || []); 
});



router.post("/", async (req, res) => {
    const { title, completed } = req.body;

    const { data } = await supabase
        .from("todos")
        .insert([{ title: title || "", completed: completed || false }])
        .select();

    res.json(data[0]); // Renvoie la todo créée
});




router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { title, completed } = req.body;

    const { data } = await supabase
        .from("todos")
        .update({ title, completed })
        .eq("id", id)
        .select();

    res.json(data[0]); 
});




router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    await supabase
        .from("todos")
        .delete()
        .eq("id", id);

    res.json({ message: "Todo supprimé" });
});

export default router;
