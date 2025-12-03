import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Connexion Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// ----------------------
// GET /todos
// ----------------------
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });

    res.json(data || []);
});

// ----------------------
// POST /todos
// ----------------------
router.post("/", async (req, res) => {
    const { title, completed } = req.body;

    const { data } = await supabase
        .from("todos")
        .insert([{ title: title || "", completed: completed || false }])
        .select();

    res.json(data[0]);
});

// ----------------------
// PUT /todos/:id
// ----------------------
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

// ----------------------
// DELETE /todos/:id
// ----------------------
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    await supabase
        .from("todos")
        .delete()
        .eq("id", id);

    res.json({ message: "Todo supprimé" });
});

export default router;
