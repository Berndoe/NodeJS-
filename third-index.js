const fs = require("fs");

// running setTimeout with 0ms delay and I/O what comes first isn't guaranteed
setTimeout(() => console.log("Set timeout 1"), 0);

// callbacks in the microtask queue are executed before callbacks in the I/O queue
fs.readFile(__filename, () => {
    console.log("readfile 1");
});

process.nextTick(() => {
    console.log("process.nextTick1");
});

Promise.resolve().then(() => console.log("promise.resolve 1"));


// Check queue (executed before I/O because of polling)
setImmediate(() => console.log("setimmediate"));