let textPos = [];
let answers = [];
let answer = [];
let moves = [];
let level = 0, words, wordQueue = [];
let speech = new SpeechSynthesisUtterance();
let wrongAudio, correctAudio, currentWord;
let mode;   //mode = 0 indicates play mode, 1 indicates assessment mode, 2 indicates learning mode
let selectedQuestionSet = [];    //to store currently selected question set from edit question tab

let svgEle, area, timer, timeDifference, stuid, schoolid, container;
speech.lang = "en";
window.speechSynthesis.onvoiceschanged = () => {
    speech.rate = 0.8;
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
    if (mode == 2) {
        words = trainingSet.pop();
        currentWord = words[0];
    }
    else
        currentWord = wordQueue.pop();
    speech.text = currentWord.word;
    // document.querySelector('#randText').innerHTML = speech.text;
    speakWord();
}

function playText() {
    speech.text = currentWord.word;
    speakWord();
}

function speakWord() {
    window.speechSynthesis.speak(speech);
    console.log(speech.text);
}
function speakWordwithHint() {
    speech.text = currentWord.hint;
    speakWord();
    speech.text = currentWord.word;
}
function addClickEvent_TextElement() {
    document.querySelectorAll('text.ansText').forEach((ele) => {
        ele.addEventListener('click',
            (event) => {
                if (currentWord.word === event.target.textContent)
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
    container = document.querySelectorAll('.gameContainer')[0];
    mode = 0;
    words = levels[0];
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
        if (mode == 0)
            $('.gameContainer').css('display', 'block');
        else
            $('#area').css('display', 'block');
        $('.loader').css('display', 'none');
        $('#startBtn').css('display', 'block');
    }, function () {
        $('#area').css('display', 'none');
        $('.gameContainer').css('display', 'none');
        $('.loader').css('display', 'block');
        $('#startBtn').css('display', 'none');
    });
    wrongAudio = new Audio('wrong.mp3');
    correctAudio = new Audio('clap.ogg');
    $('input[type=radio][name="mode"]').change(function () {
        switch (this.value) {
            case 'Play Mode':
                mode = 0;
                $('.gameContainer').css('display', 'block');
                $('#area').css('display', 'none');
                $('#levelDiv').css('display', 'flex');
                $('#levelID').css('display', 'block');
                $('#show_training_cards').css('display', 'none');
                words = levels[0];
                break;
            case 'Test Mode':
                $('.gameContainer').css('display', 'none');
                $('#area').css('display', 'block');
                $('#levelDiv').css('display', 'none');
                $('#levelID').css('display', 'none');
                $('#show_training_cards').css('display', 'none');
                mode = 1;
                if (selectedQuestionSet.length)
                    words = selectedQuestionSet;
                else
                    words = samplewords;
                break;
            case 'Training Mode': mode = 2;
                $('.gameContainer').css('display', 'none');
                $('#area').css('display', 'block');
                $('#levelDiv').css('display', 'none');
                $('#levelID').css('display', 'none');
                $('#show_training_cards').css('display', 'block');
                break;
            default: console.log('you pressed nothing');
        }
    });
    if (mode == 0)
        $('#area').css('display', 'none');
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
    initialiseToStart();
    if (mode == 0) {
        generateLevelsUI();
    }
    else {
        $('#levelDiv').css('display', 'none');
        $('#levelID').css('display', 'none');
    }
}
function initiate() {
    wordQueue = Array.from(words);
    wordQueue = shuffleArray(wordQueue);
    // createLetters();
}

function createLetters() {
    shuffleArray(words).forEach((item, i) => {
        var div = document.createElement('div');
        div.innerText = item.word;
        div.classList.add('letters');
        div.style.transitionDuration = calculateTransition() + 'ms';
        container.append(div);
        // console.log(`container x is ${container.getBoundingClientRect().x} and width is ${container.getBoundingClientRect().width}`);
        div.style.left = getRandomInt(
            0,
            container.getBoundingClientRect().width - div.getBoundingClientRect().width - 40) + 'px';
        div.style.display = 'none';
        // console.log(div);
    });
}

function calculateTransition() {
    var t = (8000 - (words.length - wordQueue.length) * 1000);
    return t >= 3000 ? t : 3000;
}

function moveLetters() {
    var elements = document.querySelectorAll('.letters');
    currentWord = wordQueue.pop();
    // console.log(`current letter is ${currentWord.word}`);
    elements.forEach((ele, i) => {
        setTimeout(
            function () {
                ele.style.display = 'flex';
                ele.style.bottom = container.getBoundingClientRect().height - ele.getBoundingClientRect().height + 'px';
                // console.log(getComputedStyle(ele).getPropertyValue('transition'));
                ele.ontransitionend = () => {
                    // console.log('Transition ended');
                    if (ele.innerText == currentWord.word)
                        gameEnd();
                    else
                        ele.remove();
                };
                ele.onclick = function (ele) { check(ele.target) }
            }
            , 1000 * i);
    });
}
function check(ele) {
    // console.log(ele);
    if (ele.innerText == currentWord.word) {
        gameSuccess(ele);
    }
    else {
        console.log('wrong');
        failure(ele);
    }
}

function gameSuccess(ele) {
    removeLetters();
    success(ele)
    console.log('success');
}

function gameEnd() {
    console.log('you failed to identify');
    moves.push('-');
    storeMoves();
    stopTimer();
    removeLetters();
}

function removeLetters() {
    document.querySelectorAll('.letters').forEach((ele) => {
        ele.remove();
    });
}

function initialiseToStart() {
    $('#c').css('display', 'block');
    if (mode == 0)
        initiate();
    else {
        if (mode == 1) {
            if (selectedQuestionSet.length > 0)
                words = selectedQuestionSet;
            else
                words = samplewords;
        } else if (mode == 2) {
            createTrainingQuestions();
        }
        loadQuestions();
        wordQueue = [];
        document.querySelectorAll('text.ansText').forEach((ele) => {
            ele.style.visibility = 'visible';
        });
        wordQueue = words.slice();
        // console.log(words);
        wordQueue = shuffleArray(wordQueue);
    }
    stuid = $('#stuid').val();
    schoolid = $('#udise').val();
    $('#studentDetailEnquire').css("display", "none");
    $('#studentDetails').css("display", "block");
    $('#studentDetails').children().first().text("Student's ID: " + stuid);
    $('#divStatus').addClass('d-flex');
    $('#divStatus').css('display', 'block');

    if (!wordQueue.length)
        alert('no questions are there');
    else {
        nxtQuestion();
        $('.nav-link')[2].setAttribute('onclick', 'alert("you can not edit question while playing.")');
    }
}

function submitAns() {
    stopTimer();
    correctAudio.pause();
    correctAudio.currentTime = 0;
    $('#divStatus').removeClass('d-flex');
    $('#divStatus').css('display', 'none');
    $('#studentDetails').css("display", "none");
    $('#levelDiv').css('display', 'none');
    $('#c').css('display', 'none');
    $('#score').css("display", "block");
    createReport(answers);
    if (mode == 2)
        $('#visualReport').css('display', 'none');
    createAnsTable(answers);
    $('.nav-link')[2].setAttribute("onclick", "displayTab('divEdit', this)");
    correctAudio.pause();
    correctAudio.currentTime = 0;
}

function reload() {
    resetTextsUI();
    resetData();
}

function resetTextsUI() {
    $('#divDetails').css("display", "block");
    $('#studentDetailEnquire').css("display", "block");
    $('#studentDetails').css("display", "none");
    document.getElementById('uploadAns').disabled = 'false';
    document.getElementById('uploadAns').removeAttribute('disabled');
    document.getElementById('uploadAns').innerHTML = "Upload";
    $('#divStatus').removeClass('d-flex');
    $('#divStatus').css("display", "none");
    $('#score').css("display", "none");
    $('#visualReport').css('display', 'block');
    $('#submitBtn').css("display", "none");
    $('#nxtBtn').css("display", "none");
    $('#skipBtn').css("display", "block");
    $('#tbdy').html("");
}

function resetData() {
    answer = [];
    answers = [];
    moves = [];
    wordQueue = [];
    level = 0;
    answerReport = [];
    if (mode == 0) {
        words = levels[level];
        updateLevelsUI(level + 1);
    }
}

function createAnsTable(tableData) {       //creating answer table
    document.getElementById('score_school_ID').innerHTML = schoolid;
    document.getElementById('score_student_ID').innerHTML = stuid;
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
    if (mode != 0) {
        $('#ansGroup').css('display', 'none');
        successElement.style.display = 'block';
        successElement.animate(scalekeyframes, scaleTiming);
        successElement.animate(translatekeyframes, scaleTiming);
        $('#successText').css('display', 'block');
        $('#successText').attr('x', (svgEle.width() - document.querySelector('#successText').getBBox().width) / 2);
        $('#successText').attr('y', (svgEle.height() - 50));
    }
}

function storeMoves() {
    answer.push(currentWord.word);
    if (currentWord.font)
        answer.push(currentWord.font);
    else
        answer.push('normal');
    answer.push(timeDifference);
    var texts = [];
    answer.push(words.map(a => a.word));
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


    if (mode == 2)
        if (trainingSet.length) {
            randomText();
            loadQuestions();
            document.querySelectorAll('text.ansText').forEach((ele) => {
                ele.style.visibility = 'visible';
            });
            startTimer();
        }
        else
            submitAns();
    else
        if (wordQueue.length) {
            // answer.push(stuid);
            if (mode != 0) { randomText(); }
            else {
                createLetters();
                moveLetters();
                playText();
            }
            startTimer();
        }
        else {
            if (mode == 1)
                submitAns();
            else if (mode == 0)
                nxtLevel();
        }
    if (mode != 0) {
        $('#successText').css('display', 'none');
        resetAnimation();
        $('#ansGroup').css('display', 'block');
        randomizeElements();
    }
    correctAudio.pause();
    correctAudio.currentTime = 0;
}

function skipQuestion() {
    stopTimer();
    storeMoves();

    if (mode == 2)
        if (trainingSet.length) {
            randomText();
            loadQuestions();
            document.querySelectorAll('text.ansText').forEach((ele) => {
                ele.style.visibility = 'visible';
            });
            startTimer();
        }
        else
            submitAns();
    else
        if (wordQueue.length) {
            // answer.push(stuid);
            if (mode != 0) { randomText(); }
            else {
                createLetters();
                moveLetters();
                playText();
            }
            startTimer();
        }
        else {
            if (mode == 1)
                submitAns();
            else if (mode == 0)
                nxtLevel();
        }
    if (mode != 0) { randomizeElements(); }
    correctAudio.pause();
    correctAudio.currentTime = 0;
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
        if (item.word)
            svgText.textContent = item.word;
        else
            svgText.textContent = item;
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
        default: return "sans-serif";
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
    if (tabid === 'divPlay')
        $('#divPlay').css('visibility', 'visible')
}


function dwnloadAns() {
    let csvContent = "data:text/csv;charset=utf-8,";
    var dataString = "School ID\tStudent ID\tQuestion\tFont Type\tTime (in milli second)\tWords\tMoves\n";
    answers.forEach(function (row) {
        dataString += "" + schoolid + "\t";
        dataString += "" + stuid + "\t";
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
        var cellCount = 0;
        Object.values(rowData).forEach(function (cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createElement('b'));
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
            cellCount++;
        });
        var cell = document.createElement('td');
        cell.classList.add('hideColumn');
        cell.style.display = "none";
        cell.innerHTML = '<b></b><a class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">X</a>';
        if (cellCount >= 3)
            row.appendChild(cell);
        else if (cellCount = 2) {
            row.appendChild(document.createElement('td'));
            row.appendChild(cell);
        }
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
    selectedQuestionSet = [];
    $('.hideColumn').css('display', 'none');
    $('#addBtn').attr('disabled', true);
    $('#saveBtn').attr('disabled', true);
    $('#editBtn').attr('disabled', false);
    $('#inQuestion').css("display", "none");
    var tableBody = $('#tQbdy');
    for (i = 0; i < tableBody.children().length; i++) {
        var ele = tableBody.children().eq(i);
        selectedQuestionSet.push({
            word: ele.children().first().text(),
            hint: ele.children().eq(1).text(),
            font: ele.children().eq(2).text()
        });
    }
    $('.nav-link').first().attr('onclick', "displayTab('divAbt', this)");
    $('.nav-link').eq(1).attr('onclick', "displayTab('divPlay', this)");
}

function addQuestion() {
    var word = $("[name='word']:first");
    var fontStyle = $("[name='font']:first");
    var hint = $("[name='hint']:first");

    if (word.val() !== "") {
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(word.val()));
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.appendChild(document.createTextNode(hint.val()));
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

function uploadQuestions() {
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
                            case 1: tempQuestion.hint = cell;
                                break;
                            case 2: tempQuestion.font = cell;
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
    document.querySelectorAll('#questionSetdiv .card').forEach((ele) => {
        // console.log(ele);
        ele.addEventListener('click',
            (event) => {
                var k = event.currentTarget.children[0].children[0].children[0].textContent;
                // console.log(parseInt(k));
                // words = wordSet[parseInt(k) - 1];
                selectedQuestionSet = wordSet[parseInt(k) - 1];
                words = selectedQuestionSet;
                createQuestionsTable(selectedQuestionSet);
                // document.querySelectorAll('.card.active').forEach((card)=>{
                //     card.classList.remove('active');
                // });
                // ele.classList.add('active');
                mode = 1;
                $('#levelDiv').css('display', 'none');
                $('#assessmentMode').prop('checked', true).trigger('change');
                var playTab = document.getElementById('divPlay');
                displayTab('divPlay', $('.nav-item').eq(1).children()[0]);
            }
        );
    });
}

function updateLevelsUI(currentActive) {
    var progress = document.getElementById('progress');
    var stepCircles = document.querySelectorAll(".circle");
    // console.log(document.getElementById('progress'));
    stepCircles.forEach((circle, i) => {
        if (i < currentActive) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    });

    const activeCircles = document.querySelectorAll(".circle.active");
    progress.style.height =
        ((activeCircles.length - 1) / (stepCircles.length)) * 100 + "%";
    document.getElementsByClassName('car')[0].style.top = progress.style.height;
}

function nxtLevel() {
    if (level < levels.length - 1) {
        level += 1;
        words = levels[level];
        updateLevelsUI(level + 1);
        console.log($('#levelID').text());
        document.getElementById('levelID').innerHTML = "Level " + (level + 1);
        console.log($('#levelID').text());
        // reload();
        initialiseToStart();
    } else {
        submitAns();
    }
}

function generateLevelsUI() {
    $('#levelDiv').css('display', 'flex');
    $('#levelID').css('display', 'block');
    var progressContainer = $('.progress-container');
    $('div').remove('.circle');
    for (var i = 0; i < levels.length; i++) {
        if (i == 0) {
            progressContainer.append($('<div class="circle active first"></div>').text((i + 1)));
        } else if (i == level.length - 1) {
            progressContainer.append($('<div class="circle last"></div>').text((i + 1)));
        } else {
            progressContainer.append($('<div class="circle"></div>').text((i + 1)));
        }
    }
}