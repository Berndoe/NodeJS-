// one way of using exports 
const math = require('./math');
console.log(math.add(1,2));
console.log(math.subtract(1,2));

// the other way
const {add, subtract} = math;
console.log(add(1,2));
console.log(subtract(1,2));


// JSON
const data = require("./data.json") 
console.log(data);

// watch mode (kind of like instant file reload)
// syntax: node --watch filename

// path module
const path = require("node:path") // node part is optional but recommended
console.log(__filename);
console.log(__dirname);

// gives the name of the file and name of the directory only
console.log(path.basename(__filename));
console.log(path.basename(__dirname));

// gives the extension name
console.log(path.extname(__filename));
console.log(path.extname(__dirname));

console.log(path.parse(__filename)); // details about the file

console.log(path.format(path.parse(__filename))); 

console.log(path.isAbsolute(__filename)); // shows if it is an absolute path

console.log(path.join("folder1", "folder2", "index.html")); // joins strings together to make a path

console.log(path.resolve("folder1", "folder2")); // adds arguments to the absolute path

// callback pattern
function greet(name) {
    console.log(`Hello ${name}`); // this function is a callback function (function passed as an argument in another function)
}

// higher order function (function that takes another function as its argument)
function greetVishwas(greetFn) {
    const name = "Vishwas";
    greetFn(name);
}

greetVishwas(greet);


// Events module 
const EventEmitter = require("node:events")
const emitter = new EventEmitter();

// registering event listener
emitter.on("order-pizza", (size, topping) => {
    console.log(`Order received. Baking a ${size} pizza with ${topping}`);
})

// emitting the event
emitter.emit("order-pizza", "large", "mushroom")

// extending from EventEmitter
const PizzaShop = require("./pizza-shop");
const DrinkMachine = require("./drink-machine");

const pizzaShop = new PizzaShop();
const drinkMachine = new DrinkMachine();
pizzaShop.on("order", (size, topping) => {
    console.log(`Order received. Baking a ${size} pizza with ${topping}`);
    drinkMachine.serveDrink(size);
});
pizzaShop.order("large","pepperoni");
pizzaShop.displayOrderNumber();

// buffers
const buffer = new Buffer.from("Vishwas");
buffer.write("Code"); // this would show Codewas in the console due to the space the buffer has
console.log(buffer.toJSON()); // displays character encoding numbers 
console.log(buffer); // displays in hex
console.log(buffer.toString());

// fs (file system) module
const fs = require("node:fs");
console.log("first");
const fileContent = fs.readFileSync("./file.txt", "utf-8"); // without utf-8 it would display a buffer
console.log(fileContent);

console.log("second");

fs.readFile("./file.txt", "utf-8", (error, data) => {
    if(error) {
        console.log(error);
    } else {
        console.log(data);
    }
})
console.log("third");

fs.writeFileSync("./greet.txt", "Greetings ");
fs.writeFile("./greet.txt", "Go",{flag: "a"}, (err) => {
    if(err) {
        console.log(error);
    }
    else {
        console.log("File writtten");
    }
});

console.log("First");

// Promise module
const files = require("node:fs/promises");
files.readFile("file.txt", "utf-8")
    .then((data) => console.log(data))
    .catch((error) => console.log(error));

console.log("Second");

// async is sort of like a wrapper over promises
async function readFile() {
    try {
        const data = await fs.readFile("file.txt", "utf-8");
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// Streams
const f = require("node:fs");
const readableStream = f.createReadStream("./file.txt", {
    encoding: 'utf-8',
    highWaterMark: 2, // reading data content in terms of 2 bytes
});

const writeableStream= f.createWriteStream("./file2.txt");

// readableStream.on("data", (chunk) => {
//     console.log(chunk);
//     writeableStream.write(chunk);
// })

// Pipes (makes writing from one file to another easier)
// one line of code needed
readableStream.pipe(writeableStream);
const zlib = require("node:zlib"); // allows zip folder creation

const gzip = zlib.createGzip();
readableStream.pipe(gzip).pipe(f.createWriteStream("./file2.txt.gz")); // chaining using a pipe

// http module (creating a node server)
const http = require("node:http");
const server = http.createServer((req, res) => {
    const name = "john";
    let html = fs.readFileSync("./index.html", "utf-8"); // this method is inefficient for large html files
    html = html.replace("{{name}}", name);
    // using the code on 164 is better
    // fs.createReadStream(__dirname + "/index.html").pipe(res); // works for static pages (pages that don't change values or accept them for example. login name)
    res.writeHead(200, {"Content-type":"text/html" })
    res.end(html);
    console.log(req);
});

// server.listen(3000, () => {
//     console.log("Server running on port 3000");
// })

// http routing 
const routingServer = http.createServer((req, res) => {

    if(req.url === "/") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Home page");
    } else if (req.url === "/about") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("About page");
    } else if (req.url === "/api") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({
            firstNAme:"Gab",
            lastName: "bob"
        }));
    } else {
        res.writeHead(404);
        res.end("Page not found");
    }
});

routingServer.listen(3000, () => {
    console.log("Server running on port 3000");
})
// 
