const DF = require('data-forge');
const PD = require('node-pandas');
const math = require('mathjs');


let df = new DF.DataFrame({
    index: [1,2,3,4,5,6,7,8,9,10],
    values: [
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 10, b: 11, c: 12, d: 13, e: 14, f: 15, g: 16, h:17, i:18, j:19},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9},
        {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h:7, i:8, j:9}
    ]
});

// console.log(df);
// console.log(df.at(3));
// console.log(df.getIndex());
// console.log(df.getColumnNames());
console.log(df.getSeries('e').toArray());

console.log(df.at(6));

console.log(df.toArray());

let p = PD.DataFrame(df.toArray());

console.log(p);

console.log(p.columns);
console.log(p.index);
console.log(p.rows);
console.log(p.cols);

p.columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

console.log(p[5].e);
