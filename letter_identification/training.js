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
function generateRandom(a) {
    var l;

    l = getRandomInt(65, 123);
    if ((l < 97 && l > 90) || l == a || l == (a + 32))
        l = generateRandom(a);

    return l;
}

function generateRandomLetters(a, i) {
    var trainingLetters = [];

    while (i > 0) {
        trainingLetters.push(String.fromCharCode(generateRandom(a)));
        i--;
    }
    return trainingLetters;
}

function createTrainingQuestions() {
    trainingSet = [
        [trainingQuestion[3], ...generateRandomLetters(trainingQuestion[3].lettercode, 4)],
        [trainingQuestion[3], ...generateRandomLetters(trainingQuestion[3].lettercode, 3)],
        [trainingQuestion[3], ...generateRandomLetters(trainingQuestion[3].lettercode, 2)],
        [trainingQuestion[2], ...generateRandomLetters(trainingQuestion[2].lettercode, 4)],
        [trainingQuestion[2], ...generateRandomLetters(trainingQuestion[2].lettercode, 3)],
        [trainingQuestion[2], ...generateRandomLetters(trainingQuestion[2].lettercode, 2)],
        [trainingQuestion[1], ...generateRandomLetters(trainingQuestion[1].lettercode, 4)],
        [trainingQuestion[1], ...generateRandomLetters(trainingQuestion[1].lettercode, 3)],
        [trainingQuestion[1], ...generateRandomLetters(trainingQuestion[1].lettercode, 2)],
        [trainingQuestion[0], ...generateRandomLetters(trainingQuestion[0].lettercode, 4)],
        [trainingQuestion[0], ...generateRandomLetters(trainingQuestion[0].lettercode, 3)],
        [trainingQuestion[0], ...generateRandomLetters(trainingQuestion[0].lettercode, 2)],
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