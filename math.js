// pattern of using modules in another file
// module.exports =  add = (a,b) => {
//     return a + b;
// }

const add = (a,b) => {
    return a + b;
}

const subtract = (a,b) => {
    return a - b;
}

// to export more than one module, we export an object
module.exports = {
    add,subtract
}


// another way of doing the above 
module.exports.add = (a,b) => {
    return a + b;
}

module.exports.subtract = (a,b) => {
    return a - b;
}

// another way 
exports.add = (a,b) => {
    return a + b;
}

exports.subtract = (a,b) => {
    return a - b;
}
