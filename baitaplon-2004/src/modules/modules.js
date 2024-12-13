

const obj = {
    ten: 'Trung',
    ho: 'Do',
    age: 20,
}

const obj2 = {
    ...obj,     // spread
    dc: 'HCM'
}

// console.log(obj2);


const a = 1
const b = 2
const c = 3

const nameFunc = (_a, ..._c) => {
    console.log(..._c);
}

nameFunc(a, b, c, 4, 5)// rest
