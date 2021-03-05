// a) Implement a generic function which will take an array of any kind, 
//    and return the array reversed (just use the built-in reverse function), 
//    so the three first calls below will print the reversed array, 
//    and the last call will fail.

function reverseArr<T>(arg: T[]): T[] {
    return arg.reverse();
}

console.log(reverseArr<string>(["a", "b", "c"]));
console.log(reverseArr<number>([1, 2, 3]));
console.log(reverseArr<boolean>([true, true, false]));
//console.log(reverseArr<number>(["a","b","c"]));

// b) Implement a generic Class DataHolder that will allow us to 
//    create instances as sketched below:

// c) Rewrite the example above to user getters and setters 
//    instead of the silly getXX and setXX methods

class DataHolder<T>{
    private _val: T;
    constructor(val: T) { this._val = val };
    public get getValue() { return this._val };
    public setValue(val: T) { this._val = val };
}

let d = new DataHolder<string>("Hello");
console.log(d.getValue);
d.setValue("World");
console.log(d.getValue);

let d2 = new DataHolder<number>(123);
console.log(d2.getValue);
d2.setValue(500);
console.log(d2.getValue);