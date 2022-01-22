let trainingQuestion = [
    {
        word: 'a',
        hint: 'a for apple',
        font: 'cursive',
        lettercode: 97
    },
    {
        word: 'A',
        hint: 'a for apple',
        lettercode: 65
    },
    {
        word: 'a',
        hint: 'a for apple',
        lettercode: 97
    },
    {
        word: 'A',
        hint: 'a for apple',
        font: 'cursive',
        lettercode: 65
    },
];

let trainingSet = [];
function generateRandom(lettercode) {
    var randomletter;
    if (lettercode < 91)
        randomletter = getRandomInt(65, 91);
    else
        randomletter = getRandomInt(97, 123);
    if (randomletter == lettercode)
        randomletter = generateRandom(lettercode);

    return randomletter;
}

function generateRandomLetters(lettercode, numberofletters, fontStyle) {
    var trainingLetters = [];

    while (numberofletters > 0) {
        trainingLetters.push({
            word: String.fromCharCode(generateRandom(lettercode)),
            font: fontStyle ? fontStyle : 'normal'
        });
        numberofletters--;
    }
    return trainingLetters;
}

function createTrainingQuestions() {
    trainingSet = [
        [trainingQuestion[3], ...generateRandomLetters(trainingQuestion[3].lettercode, 4, trainingQuestion[3].font)],
        [trainingQuestion[3], ...generateRandomLetters(trainingQuestion[3].lettercode, 3, trainingQuestion[3].font)],
        [trainingQuestion[3], ...generateRandomLetters(trainingQuestion[3].lettercode, 2, trainingQuestion[3].font)],
        [trainingQuestion[2], ...generateRandomLetters(trainingQuestion[2].lettercode, 4, trainingQuestion[2].font)],
        [trainingQuestion[2], ...generateRandomLetters(trainingQuestion[2].lettercode, 3, trainingQuestion[2].font)],
        [trainingQuestion[2], ...generateRandomLetters(trainingQuestion[2].lettercode, 2, trainingQuestion[2].font)],
        [trainingQuestion[1], ...generateRandomLetters(trainingQuestion[1].lettercode, 4, trainingQuestion[1].font)],
        [trainingQuestion[1], ...generateRandomLetters(trainingQuestion[1].lettercode, 3, trainingQuestion[1].font)],
        [trainingQuestion[1], ...generateRandomLetters(trainingQuestion[1].lettercode, 2, trainingQuestion[1].font)],
        [trainingQuestion[0], ...generateRandomLetters(trainingQuestion[0].lettercode, 4, trainingQuestion[0].font)],
        [trainingQuestion[0], ...generateRandomLetters(trainingQuestion[0].lettercode, 3, trainingQuestion[0].font)],
        [trainingQuestion[0], ...generateRandomLetters(trainingQuestion[0].lettercode, 2, trainingQuestion[0].font)],
    ];
    // words = trainingSet.pop();
}

function setActive(target) {
    document.querySelectorAll('#myModal .card.active').forEach((ele) => {
        ele.classList.remove('active');
    });
    target.classList.add('active');
    console.log(parseInt(target.dataset.letter));
    trainingQuestion = [
        {
            word: String.fromCharCode(parseInt(target.dataset.letter) + 32),
            hint: target.dataset.hint,
            font: 'cursive',
            lettercode: (parseInt(target.dataset.letter) + 32)
        },
        {
            word: String.fromCharCode(parseInt(target.dataset.letter)),
            hint: target.dataset.hint,
            lettercode: parseInt(target.dataset.letter)
        },
        {
            word: String.fromCharCode(parseInt(target.dataset.letter) + 32),
            hint: target.dataset.hint,
            lettercode: (parseInt(target.dataset.letter) + 32)
        },
        {
            word: String.fromCharCode(parseInt(target.dataset.letter)),
            hint: target.dataset.hint,
            font: 'cursive',
            lettercode: parseInt(target.dataset.letter)
        },
    ];
}