// index.ts - Fixed TypeScript file

// Basic data types
let isActive: boolean = true;
let count: number = 10;
let userName: string = "Rana";

let nothing: null | string = null;
let notDefined: undefined | number = undefined;

// Logical operators examples
let a: number = 3;
let b: number = 5;

// AND operator (&&)
if (a === 3 && b < 5) {
  console.log("Hello");
} else {
  console.log("Goodbye");
}

// OR operator (||)
if (a < 7 || b < 5) {
  console.log("Hello");
} else {
  console.log("Goodbye");
}

// NOT operator
console.log(!false);

// Loop example
for (let i = 0; i <= 5; i++) {
  console.log("Hello");
}