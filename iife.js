// example of module scope
(function (message) {
    const superHero = "Batman";
    console.log(message, superHero);
})("Yo");
// allows you to reuse variable names without any repercussions
// immediately invoked function expression (iife)

// Module wrapping just shows how the module scope is executed
// There are five parameters that are used to wrap the module.
// These are exports, require, __dirname, __filename, this.