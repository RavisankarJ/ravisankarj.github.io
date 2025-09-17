let trainingNumbers = [], selectedNumberSet = [];
const divisibleCheck = function (n, divider) {
    return n % divider == 0 ? true : false;
}
const reversedNum = num => parseFloat(num.toString().split('').reverse().join(''))
let numberSet = [
    [
        {word: '0'},
        ...[...Array(5).keys()].map(function (n) {
            return { word: n+1 }
        })
    ],
    [
        ...[...Array(5).keys()].map(function (n) {
            return { word: n + 6 }
        })
    ],
    [
        ...[...Array(5).keys()].map(function (n) {
            return { word: n + 11 }
        })
    ],
    [
        ...[...Array(5).keys()].map(function (n) {
            return { word: n + 16 }
        })
    ],
    [
        ...generateRandomNumbers(21, 100, 5).map(function (n) {
            return { word: n }
        })
    ],
    [
        ...gernerateReverseNumbers(
        generateRandomNumbers(12, 98, 3, divisibleCheck)).map(function (n) {
            return { word: n }
        })
    ],
    [
        ...generateRandomNumbers(101, 1000, 5).map(function (n) {
            return { word: n }
        })
    ],
    [
        ...generateRandomNumbers(1001, 10000, 5).map(function (n) {
            return { word: n }
        })
    ]
];

function generateRandomN(min, max, condition) {
    var randomNumber;
    randomNumber = getRandomInt(min, max);
    if (trainingNumbers.find(n => n == randomNumber))
        randomNumber = generateRandom(min, max, condition);
    if (condition) 
        if (condition(randomNumber, 11)||condition(randomNumber, 10))
            randomNumber = generateRandom(min, max, condition);
    return randomNumber;
}


function generateRandomNumbers(min, max, numberofletters, condition=false) {
    trainingNumbers = [];
    while (numberofletters > 0) {
        trainingNumbers.push(generateRandomN(min, max, condition));
        numberofletters--;
    }
    return trainingNumbers;
}



function gernerateReverseNumbers(arr){
    var generatedNumbers = [];
    arr.forEach((item)=>{
        generatedNumbers.push(item);
        generatedNumbers.push(reversedNum(item));
    });
    return generatedNumbers;
}