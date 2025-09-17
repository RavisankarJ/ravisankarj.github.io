let selectedQuestions = [];

let questions = [
  { target: 1000, maxMov: -1, exactMove: false, question: "Fill the tank with 1L of water." },
  { target: 3000, maxMov: 6, exactMove: true, question: "Fill the tank with 3L of water in exactly 6 moves." },
  { target: 950, maxMov: -1, exactMove: false, question: "Fill the tank with 950mL of water." },
  { target: 950, maxMov: 6, exactMove: true, question: "Fill the tank with 950mL of water in exactly 6 moves." },
  { target: 600, maxMov: 3, exactMove: true, question: "Fill the tank with 600mL of water in exactly 3 moves." }
];

let questionSet = [
  [
    { target: 1000, maxMov: -1, exactMove: false, question: "Fill the tank with 1L of water." },
    { target: 2000, maxMov: -1, exactMove: false, question: "Fill the tank with 2L of water." },
    { target: 3000, maxMov: -1, exactMove: false, question: "Fill the tank with 3L of water." },
    { target: 4000, maxMov: -1, exactMove: false, question: "Fill the tank with 4L of water." },
    { target: 5000, maxMov: -1, exactMove: false, question: "Fill the tank with 5L of water." }
  ],
  [
    { target: 1500, maxMov: -1, exactMove: false, question: "Fill the tank with 1500mL of water." },
    { target: 2250, maxMov: -1, exactMove: false, question: "Fill the tank with 2250mL of water." },
    { target: 3750, maxMov: -1, exactMove: false, question: "Fill the tank with 3750mL of water." },
    { target: 4500, maxMov: -1, exactMove: false, question: "Fill the tank with 4500mL of water." },
    { target: 750, maxMov: -1, exactMove: false, question: "Fill the tank with 750mL of water." },
    { target: 9450, maxMov: -1, exactMove: false, question: "Fill the tank 9450mL." }
  ],
  [
    { target: 3000, maxMov: 6, exactMove: false, question: "Fill the tank with 3L of water in less than 6 moves." },
    { target: 600, maxMov: 3, exactMove: false, question: "Fill the tank with 600mL of water in less than 3 moves." },
    { target: 2500, maxMov: 4, exactMove: false, question: "Fill the tank with 2500mL of water in less than 4 moves." },
    { target: 3700, maxMov: 6, exactMove: false, question: "Fill the tank with 3700mL of water in less than 6 moves." },
    { target: 1200, maxMov: 4, exactMove: false, question: "Fill the tank with 1200mL of water in less than 4 moves." }
  ],
  [
    { target: 3000, maxMov: 6, exactMove: true, question: "Fill the tank with 3L of water in exactly 6 moves." },
    { target: 1500, maxMov: 3, exactMove: true, question: "Fill the tank with 1500mL of water in exactly 3 moves." },
    { target: 2500, maxMov: 4, exactMove: true, question: "Fill the tank with 2500mL of water in exactly 4 moves." },
    { target: 1700, maxMov: 4, exactMove: true, question: "Fill the tank with 1700mL of water in exactly 4 moves." },
    { target: 1200, maxMov: 4, exactMove: true, question: "Fill the tank with 1200mL of water in exactly 4 moves." },
    { target: 950, maxMov: 6, exactMove: true, question: "Fill the tank with 950mL of water in exactly 6 moves." }
  ]
];

function setQuestions() {
  questions = [];
  var tempQuestionSet;
  questionSet.forEach((set) => {
    tempQuestionSet = shuffleArray([...set]);
    questions.push(tempQuestionSet.pop());
    questions.push(tempQuestionSet.pop());
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function updateQuestionSet() {
  var questionSetElement = document.getElementById('questionSetdiv');
  if (questionSet.length > 0)
    $(questionSetElement).empty();

  questionSet.forEach((set, i) => {
    var qArray = set.map(a => a.question);
    var list = $('<ul class="list-group"></ul>');
    qArray.forEach((q) => {
      var list_item = $('<li class="mylist-group-item"></li>').html(q);
      list.append(list_item);
    });
    var cardDiv = $('<div class="col mb-4"></div>')
      .append($('<div class="card h-100 text-center"></div>)')
        .append($('<div class="card-body"></div>')
          .append($('<h5 class="card-title"></h5>').html('Question Set <span class="qsetNo"0>' + (i + 1) + '</span>'),
            list)));

    $(questionSetElement).append(cardDiv);

  });
  addClickEvent_CardElement();
}