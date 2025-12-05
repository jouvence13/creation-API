import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

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

    if (error) return res.status(400).json({ error: error.message });

    res.json(data || []);
});

// ----------------------
// POST /todos
// ----------------------
router.post("/", async (req, res) => {
    const { title, completed } = req.body;

    const { data, error } = await supabase
        .from("todos")
        .insert([{ title: title || "", completed: completed || false }])
        .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data[0]);
});

// ----------------------
// PUT /todos/:id
// ----------------------
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { title, completed } = req.body;

    const { data, error } = await supabase
        .from("todos")
        .update({ title, completed })
        .eq("id", id)
        .select();

    if (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Todo non trouvée" });
    }

    res.json(data[0]);
});

// ----------------------
// DELETE /todos/:id
// ----------------------
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Todo supprimée" });
});

export default router;
