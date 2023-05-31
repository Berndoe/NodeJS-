const obj1 = {
    name:"B"
}

let obj2 = obj1 

// assigning an object literal breaks the reference.  
obj2 = {
    name:"C"
}
console.log(obj1);