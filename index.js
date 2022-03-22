//CONFIGURAÇÕES:
//import express from "express"
const express = require("express");
const path = require("path");
const res = require("express/lib/response ");
const app = express();


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());


const pokedex = [{
        id: 1,
        nome: "Fennekin",
        descricao: "Eating a twig fills it with energy, and its roomy ears give vent to air hotter than 390 degrees Fahrenheit.",
        tipo: "FIRE",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/653.png",
    },
    {
        id: 2,
        nome: "Vulpix",
        descricao: "While young, it has six gorgeous tails. When it grows, several new tails are sprouted.",
        tipo: "FIRE",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png",
    },
    {
        id: 3,
        nome: "Zorua",
        descricao: "Zorua is a timid Pokémon. This disposition seems to be what led to the development of Zorua is ability to take on the forms of other creatures.",
        tipo: "DARK",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/570.png",
    }
];

let pokemon = undefined;

//ROTAS 
app.get("/", (req, res) => {
    res.render("index", { pokedex, pokemon });
});

app.post("/create", (req, res) => {
    const pokemon = req.body;
    pokemon.id = pokedex.length + 1;
    pokedex.push(pokemon);
    res.redirect("/");
});

app.get("/detalhes/:id", (req, res) => {
    const id = +req.params.id;
    pokemon = pokedex.find((pokemon) => pokemon.id === id);
    res.redirect("/");
});

app.post("/update/:id", (req, res) => {
    const id = +req.params.id - 1;
    const newPokemon = req.boby
    console.log(newPokemon);
    pokedex[id] = newPokemon;
    res.redirect("/");
});

const port = 3001
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});