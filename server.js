import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🟢 Tu dominio completo de InfinityFree con https:// al inicio
const BASE_URL = "https://luissvalencia.gt.tc/php/";

// 🔹 Función auxiliar para reenviar peticiones POST al servidor PHP
async function forwardPHP(req, res, phpFile) {
  try {
    const response = await fetch(`${BASE_URL}${phpFile}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(req.body),
    });

    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 🔹 Rutas
app.post("/login", (req, res) => forwardPHP(req, res, "login.php"));
app.post("/add_mascota", (req, res) => forwardPHP(req, res, "add_mascota.php"));
app.post("/get_mascotas", (req, res) => forwardPHP(req, res, "get_mascotas.php"));
app.post("/add_solicitud_paseo", (req, res) => forwardPHP(req, res, "add_solicitud_paseo.php"));
app.post("/get_paseadores", (req, res) => forwardPHP(req, res, "get_paseadores.php"));

// 🔹 Render usa su propio puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy activo en el puerto ${PORT}`));
