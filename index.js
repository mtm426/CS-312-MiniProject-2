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
    
    // Creating variable for input or non input result in Friend
    const name = req.body.name || "Friend";
    const category = req.body.category || "Any";
    
    try {
    
        // Call JokeAPI for a random joke
        const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=single`);
        const data = await response.json();
    
        // Creating a variable for the joke we get
        let joke = data.joke;
    
        // Giving results.ejs file this data...
        res.render("results", { joke, name });
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