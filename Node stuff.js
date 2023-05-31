// require('./add'); // imports add.js as a module
const Superhero = require('./super-hero');
console.log(Superhero.getName());
Superhero.setName("Ben");
console.log(Superhero.getName());

const newHero = require('./super-hero'); // uses line 1 (caching)
console.log(newHero.getName());