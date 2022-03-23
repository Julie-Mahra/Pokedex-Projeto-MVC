//CONFIGURAÇÕES:
const express = require("express");
const path = require("path");
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
    },
    {
        id: 4,
        nome: "Togepi ",
        descricao: "The shell seems to be filled with joy. It is said that it will share good luck when treated kindly.",
        tipo: "FAIRY",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/175.png",
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
    res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
    const id = +req.params.id;
    pokemon = pokedex.find((pokemon) => pokemon.id === id);
    res.redirect("/#cadastro");
});

app.post("/update/:id", (req, res) => {
    const id = +req.params.id - 1;
    const newPokemon = req.body;
    newPokemon.id = id + 1;
    pokedex[id] = newPokemon;
    pokemon = undefined;
    res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
    const id = +req.params.id - 1;
    delete pokedex[id];

    res.redirect("/#cards");
});
//Porta na qual o servidor ira rodar
const port = 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});