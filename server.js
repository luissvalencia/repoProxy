import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tu dominio de InfinityFree (ajústalo)
const BASE_URL = "luissvalencia.gt.tc/php/";

app.post("/login", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(req.body),
    });

    const text = await response.text();
    res.send(text); // Devuelve el JSON limpio
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Puedes agregar más rutas (ejemplo para mascotas)
app.post("/get_mascotas", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}get_mascotas.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(req.body),
    });

    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Proxy listo en el puerto 3000"));
