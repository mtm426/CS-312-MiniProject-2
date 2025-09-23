// importing files using module method from videos
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// setting file name and dir name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// set ejs as view engine
app.set("view engine", "ejs");

// Home route
app.get("/", (req,res) => {
    res.render("index");
})

// This handles the joke request
app.post("/joke", async(req, res) => {
    const { name, category } = req.body;

    try{
        const url = `https://v2.jokeapi.dev/joke/${category}?type=single`;
        const response = await axios.get(url);

        // getting the joke from the data
        let joke = response.data.joke

        // if they typed in a name
        if(name){
            // replace chuck norris, all occasions and not case sensitive with their name
            joke = joke.replace("/Chuck Norris/gi", name);
        }

        res.render("results", { name, category, joke });
    } catch(error) {
        console.error(error);
        res.render("results", {
            name, category, 
            joke: "Ah noooo! We couldn't find a joke. Try again please :)",
        });
    }
});

// start the website
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});