let textPos = [];
let answers = [];
let answer = [];
let moves = [];
let level = 0, words, wordQueue = [];
let speech = new SpeechSynthesisUtterance();
let wrongAudio, correctAudio, currentWord;

let svgEle, area, timer, timeDifference, stuid;
speech.lang = "en";
window.speechSynthesis.onvoiceschanged = () => {
    speech.rate = 1;
    speech.volume = 1;
    speech.pitch = 1;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function random(textEle) {
    var randomX = getRandomInt(
        40,
        document.querySelector('#area').clientWidth - 80
    );
    var randomY = getRandomInt(
        40,
        document.querySelector('#area').clientHeight - 80
    );
    if (checkOverlapping(randomX, randomY, textEle)) {
        textEle.setAttribute('x', randomX);
        textEle.setAttribute('y', randomY);
        textPos.push({ x: randomX, y: randomY, w: textEle.getBBox().width, area: textEle.getBBox().width * textEle.getBBox().height });
    } else
        random(textEle);
}

function checkOverlapping(x, y, circleElement) {
    var v = true;
    var i;
    for (i = 0; i < textPos.length; i++) {
        if ((Math.abs(textPos[i].x - x) < 40) || (Math.abs(textPos[i].x + textPos[i].w - x) < 40) || ((Math.abs(textPos[i].x - (x + circleElement.getBBox().width)) < 40))) {
            if (Math.abs(textPos[i].y - y) < 40) {
                v = false;
                break;
            }
        }
    }
    return v;
}



function randomizeElements() {
    document.querySelectorAll('text.ansText').forEach((item) => {
        random(item);
    });


    textPos = [];
}

function randomText() {
    currentWord = wordQueue.pop();
    speech.text = currentWord.word;
    // document.querySelector('#randText').innerHTML = speech.text;
    speakWord();
}

function speakWord() {
    window.speechSynthesis.speak(speech);
    console.log(speech.text);
}

function addClickEvent_TextElement() {
    document.querySelectorAll('text.ansText').forEach((ele) => {
        ele.addEventListener('click',
            (event) => {
                if (speech.text === event.target.textContent)
                    success(ele);
                else
                    failure(ele);
            }
        );
    });
}

function setTransform(ele) {
    var x = parseInt(ele.getAttribute('x')) + Math.round(ele.getBBox().width / 2);
    var y = parseInt(ele.getAttribute('y')) + Math.round(ele.getBBox().height / 2);
    var translateString = "translate(" + x + " " + y + ") " + "scale(1.5) " + "translate(" + -x + " " + -y + ")";
    ele.setAttribute('transform', translateString);
}
function clearTransform(ele) {
    var x = parseInt(ele.getAttribute('x')) + Math.round(ele.getBBox().width / 2);
    var y = parseInt(ele.getAttribute('y')) + Math.round(ele.getBBox().height / 2);
    var translateString = "translate(" + x + " " + y + ") " + "scale(1) " + "translate(" + -x + " " + -y + ")";
    ele.setAttribute('transform', translateString);
}


$(function () {
    svgEle = $('#c svg');
    words = samplewords;
    loadQuestions();
    svgEle.attr('width', $('#c').outerWidth());
    if ((area * 20 / svgEle.attr('width')) > 260)
        svgEle.attr('height', area * 20 / svgEle.attr('width'));
    else
        svgEle.attr('height', 260);

    resizeObserver.observe(document.getElementById('c'));
    var waitForEl = function (selector, callback, anotherCallback) {
        if (jQuery(selector).length) {
            callback();
        } else {
            anotherCallback();
            setTimeout(function () {
                waitForEl(selector, callback, anotherCallback);
            }, 100);
        }
    };

    waitForEl(speech, function () {
        $('#area').css('display', 'block');
        $('.loader').css('display', 'none');
        $('#startBtn').css('display', 'block');
    }, function () {
        $('#area').css('display', 'none');
        $('.loader').css('display', 'block');
        $('#startBtn').css('display', 'none');
    });
    wrongAudio = new Audio('wrong.mp3');
    correctAudio = new Audio('clap.ogg');
});

let resizeObserver = new ResizeObserver(() => {
    setSvgDimension();
    randomizeElements();
});

function setSvgDimension() {
    svgEle.attr('width', $('#c').outerWidth());
    if ((area * 20 / svgEle.attr('width')) > 260)
        svgEle.attr('height', area * 20 / svgEle.attr('width'));
    else
        svgEle.attr('height', 260);
}

function start() {
    $('#c').css('display', 'block');
    loadQuestions();
    wordQueue = [];
    stuid = $('#stuid').val();
    $('#studentDetailEnquire').css("display", "none");
    $('#studentDetails').css("display", "block");
    $('#studentDetails').children().first().text("Student's ID: " + stuid);
    $('#divStatus').addClass('d-flex');
    $('#divStatus').css('display', 'block');
    document.querySelectorAll('text.ansText').forEach((ele) => {
        ele.style.visibility = 'visible';
        // wordQueue.push(ele.textContent);
    });
    wordQueue = words.slice();
    // answer.push(stuid);
    wordQueue = shuffleArray(wordQueue);
    if (!wordQueue.length)
        alert('no questions are there');
    else {
        nxtQuestion();
        $('.nav-link')[2].setAttribute('onclick', 'alert("you can not edit question while playing.")');
    }
}


function submitAns() {
    stopTimer();
    $('#divStatus').removeClass('d-flex');
    $('#divStatus').css('display', 'none');
    $('#studentDetails').css("display", "none");
    $('#c').css('display', 'none');
    $('#score').css("display", "block");
    createAnsTable(answers);
    $('.nav-link')[2].setAttribute("onclick", "displayTab('divEdit', this)");
}

function reload() {

    $('#divDetails').css("display", "block");
    $('#studentDetailEnquire').css("display", "block");
    $('#studentDetails').css("display", "none");

    $('#divStatus').removeClass('d-flex');
    $('#divStatus').css("display", "none");
    $('#score').css("display", "none");
    $('#submitBtn').css("display", "none");
    $('#nxtBtn').css("display", "none");
    $('#skipBtn').css("display", "block");
    $('#tbdy').html("");
    answer = [];
    answers = [];
    moves = [];
    wordQueue = [];
}

function createAnsTable(tableData) {       //creating answer table
    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');
        // row.appendChild(document.createElement('td').appendChild(document.createElement('b').appendChild(document.createTextNode(stuid))));
        for (i = 0; i < rowData.length; i++) {
            var cell = document.createElement('td');
            switch (i) {
                case 4:
                case 5: var text = "";
                    rowData[i].forEach(function (cellData) {
                        text += cellData + " ";
                    });
                    cell.appendChild(document.createElement('b'));
                    cell.appendChild(document.createTextNode(text));
                    break;
                default: cell.appendChild(document.createElement('b'));
                    cell.appendChild(document.createTextNode(rowData[i]));
            }
            row.appendChild(cell);
        }
        $('#tbdy').append(row);
    });
}

function startTimer() {
    var startTime = new Date().getTime();
    timer = setInterval(function () {
        var now = new Date().getTime();
        timeDifference = now - startTime;
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        $('#timer').text(minutes + ":" + seconds);
    }, 500);

    $('#skipBtn').css('display', 'block');
    $('#nxtBtn').css('display', 'none');
}

function stopTimer() {
    clearInterval(timer);

    $('#skipBtn').css('display', 'none');
    $('#nxtBtn').css('display', 'block');
    // $('#timer').innerText="";
}

function success(eleTag) {      //called by correct selection
    correctAudio.play();
    stopTimer();
    moves.push(eleTag.textContent);
    storeMoves();
    // document.querySelectorAll('text.ansText').forEach((ele) => {
    //     ele.style.display = 'none';
    // });
    $('#ansGroup').css('display', 'none');
    successElement.style.display = 'block';
    successElement.animate(scalekeyframes, scaleTiming);
    successElement.animate(translatekeyframes, scaleTiming);


    $('#successText').css('display', 'block');
    $('#successText').attr('x', (svgEle.width() - document.querySelector('#successText').getBBox().width) / 2);
    $('#successText').attr('y', (svgEle.height() - 50));
}

function storeMoves() {
    answer.push(speech.text);
    if (currentWord.font)
        answer.push(currentWord.font);
    else
        answer.push('normal');
    answer.push(timeDifference);
    var texts = [];
    document.querySelectorAll('text.ansText').forEach((ele) => {
        texts.push(ele.textContent);
    });
    // eleTag.style.display = 'block';
    answer.push(texts);
    answer.push(moves);
    answers.push(answer);
    answer = [];
    moves = [];
    // console.table(answers);
}

function failure(ele) {     //called by wrong selection
    wrongAudio.play();
    console.log('failure');
    moves.push(ele.textContent);
    // console.table(moves);
}

const successElement = document.querySelector('#successSvg');



const scalekeyframes = {
    transform: ['scale(1)', 'scale(0.8)', 'scale(1.2)'],
}

const translatekeyframes = {
    transform: ['translateX(0)', 'translateX(10%)', 'translateX(30%)']
}

const scaleTiming = {
    duration: 1000,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out',
    composite: 'add'
}

function nxtQuestion() {
    $('#successText').css('display', 'none');
    resetAnimation();
    // document.querySelectorAll('text.ansText').forEach((ele) => {
    //     ele.style.display = 'block';
    // });
    $('#ansGroup').css('display', 'block');
    randomizeElements();
    if (wordQueue.length) {
        answer.push(stuid);
        randomText();
        startTimer();
    }
    else {
        submitAns();
    }
    correctAudio.pause();
    correctAudio.currentTime = 0;
}

function skipQuestion() {
    stopTimer();
    storeMoves();
    randomizeElements();
    if (wordQueue.length) {
        answer.push(stuid);
        randomText();
        startTimer();
    }
    else
        submitAns();
}

function resetAnimation() {
    document.querySelector('#successSvg').getAnimations().forEach((animi) => animi.cancel());
    document.querySelector('#successSvg').style.display = 'none';
}

function loadQuestions() {
    var svgns = "http://www.w3.org/2000/svg";
    var svgText;
    document.querySelectorAll('text.ansText').forEach((item) => {
        item.remove();
    });
    words.forEach((item) => {
        svgText = document.createElementNS(svgns, "text");
        svgText.setAttribute("class", "ansText");
        svgText.setAttribute("filter", "url(#solid)");

        svgText.setAttribute("style", "font-weight:bold;font-size:2em;fill:green;");
        svgText.setAttribute("onmouseover", "setTransform(event.target)");
        svgText.setAttribute("onmouseleave", "clearTransform(event.target)");

        svgText.setAttribute("font-family", findFont(item));
        svgText.textContent = item.word;
        document.querySelector('#ansGroup').appendChild(svgText);
    });
    // randomizeElements();
    addClickEvent_TextElement();
    calculateArea();
    setSvgDimension();
}

function findFont(item) {
    switch (item.font) {
        case ("cursive"): return "Cookie";
        case ("tamil"): return "Catamaran";
        default: return "serif";
    }
}

function calculateArea() {
    var textElements = document.querySelectorAll('text.ansText');
    area = 0;
    textElements.forEach((textElement) => {
        area += textElement.getBBox().width * textElement.getBBox().height;
    });
}

function shuffleArray(array) {

    return array.sort(() => Math.random() - 0.5);

}
function displayTab(tabid, element) {
    $('.tabContent').css("display", "none");
    $('#' + tabid).css("display", "block");
    var linkTags = $('.nav-item');
    for (i = 0; i < linkTags.length; i++) {
        linkTags[i].classList.remove('active');
    }
    element.parentElement.classList.add('active');
    if (element.innerText === 'Edit Questions') {
        createQuestionsTable(words);
        updateQuestionSet();
    }
    else if (element.innerText.trim() === 'Play')
        $('#divPlay').css('visibility', 'visible');
}


function dwnloadAns() {
    let csvContent = "data:text/csv;charset=utf-8,";
    var dataString = "Student ID\tQuestion\tFont Type\tTime (in milli second)\tWords\tMoves\n";
    answers.forEach(function (row) {
        row.forEach(function (cell) {
            if (Array.isArray(cell)) {
                dataString += cell.join(", ");
                dataString += "\t";
            }
            else if (typeof cell === 'object' && cell !== null) {
                dataString += "" + Object.values(cell).join("\t");
                dataString += "\t";
            } else {
                dataString += "" + cell + "\t";
            }
        });
        dataString += "\n";
    });
    // var encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
    csvContent += dataString;
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    var dt = new Date();
    var filename = "Letter_Identification" + stuid + "_" + dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear() + "_"
        + dt.getHours() + "_" + dt.getMinutes() + "_" + dt.getSeconds();
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
}

function createQuestionsTable(tableData) {
    $('#tQbdy').html("");
    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');
        Object.values(rowData).forEach(function (cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createElement('b'));
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        var cell = document.createElement('td');
        cell.classList.add('hideColumn');
        cell.style.display = "none";
        cell.innerHTML = '<b></b><a class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">X</a>';
        row.appendChild(cell);
        $('#tQbdy').append(row);
    });
}

function editQuestions() {
    $('.hideColumn').css('display', 'block');

    $('#addBtn').attr('disabled', false);
    $('#saveBtn').attr('disabled', false);
    $('#editBtn').attr('disabled', true);
    $('#inQuestion').css("display", "block");
    $('.nav-link:first').attr('onclick', 'alert("Save your edits")');
    $('.nav-link:eq(1)').attr('onclick', 'alert("Save your edits")');
}

function saveQuestions() {
    words = [];
    $('.hideColumn').css('display', 'none');

    $('#addBtn').attr('disabled', true);
    $('#saveBtn').attr('disabled', true);
    $('#editBtn').attr('disabled', false);
    $('#inQuestion').css("display", "none");
    var tableBody = $('#tQbdy');
    for (i = 0; i < tableBody.children().length; i++) {
        var ele = tableBody.children().eq(i);
        words.push({
            word: ele.children().first().text(),
            font: ele.children().eq(1).text()
        });
    }
    $('.nav-link').first().attr('onclick', "displayTab('divAbt', this)");
    $('.nav-link').eq(1).attr('onclick', "displayTab('divPlay', this)");
}

function addQuestion() {
    var word = $("[name='word']:first");
    var fontStyle = $("[name='font']:first");


    if (word.val() !== "") {
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(word.val()));
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.appendChild(document.createTextNode(fontStyle.val()));
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.classList.add('hideColumn');
        // cell.style.display = "none";
        cell.innerHTML = '<a class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">X</a>';
        row.appendChild(cell);
        $('#tQbdy').append(row);
        word.val("");
        fontStyle.val("");
    } else {
        word.focus();
        alert('You missed to type question.');
    }
}

function dwnloadQues() {
    let csvContent = "data:text/csv;charset=utf-8,"
        + "Word\tFont Style\n"
        + words.map(e => Object.values(e).join("\t")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    var dt = new Date();
    var filename = "Letter_Identification_" + dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear() + "_"
        + dt.getHours() + "_" + dt.getMinutes() + "_" + dt.getSeconds();
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
}

function uploadReport() {
    Papa.parse(myfile.files[0], {
        delimiter: "\t",
        complete: function (results) {
            var tempQuestions = [];
            var j = 0;
            (results.data).forEach(function (item) {
                if (j > 0) {
                    var tempQuestion = {};
                    var i = 0;
                    item.forEach(function (cell) {
                        switch (i) {
                            case 0: tempQuestion.word = cell;
                                break;
                            case 1: tempQuestion.font = cell;
                                break;
                            default: console.log("some error");
                        }
                        i++;
                    });
                    if (tempQuestion.word)
                        tempQuestions.push(tempQuestion);
                }
                j++;
            });
            words = tempQuestions;
            createQuestionsTable(words);
            $('#myfile').value = "";
        },
        error: function (e) {
            console.log('error while reading csv file... the details are\n' + e);
        }
    });
}

function updateQuestionSet() {
    var wordSetElement = document.getElementById('questionSetdiv');
    if (wordSet.length > 0)
        $(wordSetElement).empty();

    wordSet.forEach((set, i) => {
        var cardDiv = $('<div class="col mb-4"></div>')
            .append($('<div class="card h-100 text-center"></div>)')
                .append($('<div class="card-body"></div>')
                    .append($('<h5 class="card-title"></h5>').html('Word Set <span class="qsetNo"0>' + (i + 1) + '</span>'),
                        (stringifySet(set)))));

        $(wordSetElement).append(cardDiv);

    });
    addClickEvent_CardElement();
}

function stringifySet(set) {
    var cardParaElement = $('<p class="card-text"></p>');
    for (var i = 0; i < set.length; i++) {
        if (i < (set.length - 1))
            cardParaElement.append($('<span></span>').css('font-family', findFont(set[i])).text(set[i].word + ", "));
        else
            cardParaElement.append($('<span></span>').css('font-family', findFont(set[i])).text(set[i].word));
    }
    return cardParaElement;
}

function addClickEvent_CardElement() {
    document.querySelectorAll('.card').forEach((ele) => {
        // console.log(ele);
        ele.addEventListener('click',
            (event) => {
                var k = event.currentTarget.children[0].children[0].children[0].textContent;
                console.log(parseInt(k));
                words = wordSet[parseInt(k) - 1];
                createQuestionsTable(words);
            }
        );
    });
}

