// thread pool
const fs = require("node:fs");

console.log("First");

fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log("file content");
}) // content in here comes last because of libuv

console.log("last");

// another demonstration
const crypto = require("node:crypto");
const { ChildProcess } = require("node:child_process");
const start = Date.now();
// 15-18 shows that the time taken for execution doubles with every call
// crypto.pbkdf2Sync("password", "salt", 100000, 512, "sha512"); // this method is cpu intensive
// crypto.pbkdf2Sync("password", "salt", 100000, 512, "sha512"); // this method is cpu intensive
// crypto.pbkdf2Sync("password", "salt", 100000, 512, "sha512"); // this method is cpu intensive
// console.log(`Hash: ${Date.now() - start}`);

// 20-27 shows that asynchronous calls doesn't double execution time every time the call is made
// process.env.UV_THREADPOOL_SIZE = 6; // changing the number of threads libuv has. i didnt get the expected outcome which is supposed to be the last thread runtime being closer to the others
const MAX_CALLS = 4;
// for (let index = 0; index < MAX_CALLS; index++) {
//     crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
//         console.log(`Hash: ${index + 1}`, Date.now() - start);
//     });     
    
// }

// libuv has four threads


// network I/O (doesn't use the thread pool)
// const https = require("node:https");
// for (let i = 0; i < MAX_CALLS; i++) {
//     https
//         .request("https://www.google.com", (res) => {
//             res.on("data", () => {});
//             res.on("end", () => {
//                 console.log(`Request: ${i + 1}`, Date.now() - start);
//             })
//         })
//         .end();
    
// }

// Microtask queues
Promise.resolve().then(() => {
    console.log("This is promise.resolve 1");
});

// this would execute before resolve
process.nextTick(() => {
    console.log("This is process.nextTick 1");
})

// Timer queue
// The timeout with the least time is executed first
// the microtask queue is checked after every setTimeout
setTimeout(() => console.log("Set timeout 1"), 0);
setTimeout(() => console.log("Set timeout 2"), 0);
setTimeout(() => console.log("Set timeout 3"), 0);
// microtask queues executed before timer queue


