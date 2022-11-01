const express = require('express');
const contenedor = require('./Contenedor.js')

const fs = require('fs');

const data = fs.readFileSync('productos.txt', 'utf-8')

const app = express();

const productos = new contenedor('./productos.txt')

app.get('/', (req, res) => {
    res.send("<h1>Introduce /productos o /productoalazar</h1>")

});

app.get('/productos', async (req, res) => {
    const prods = await productos.getAll()
    res.send(prods)

});

app.get('/productoRandom', async (req, res) => {
    const prods = await productos.getAll()
    const random = parseInt(Math.random()*prods.length)
    res.send(prods [random])

});

const PORT = 8080;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));



