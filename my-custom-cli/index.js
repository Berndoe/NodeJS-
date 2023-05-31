#!/usr/bin/env node

// const yargs = require("yargs");
// const { argv } = yargs(process.argv); // allows you to use the cli to pass argruments into a function 

const inquirer = require("inquirer");

const printFiveMoves = async (pokemonName) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemon = await response.json();
    const moves = pokemon.moves.map(({ move }) => move.name);
    console.log(moves.slice(0, 5));
};
const prompt = inquirer.createPromptModule();
prompt([ {
    type: "input",
    name: "pokemon",
    "message": "Enter pokemon name to see its first five moves:"

}]).then((answer) => {
    const pokemon = answer.pokemon
    printFiveMoves(pokemon);
})