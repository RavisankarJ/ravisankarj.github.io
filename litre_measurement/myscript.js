
let targetLevel = 0;
let maxMoves = 0;

let cntMoves = 0;
let isMaxMove = true;
let isExactMove = true;
let myTank;
let elements = [];
let labels = [];
let canvas = document.createElement("canvas");
let mainCtx = canvas.getContext('2d');
let currentQuestion = 0;
let numberOfQuestions = 0;
let backgroundImage, shelf;
let tank = "tank.png";
let jar = "jar.png";
let label1 = "label1.png";
let label2 = "label2.png";
let label3 = "label3.png";
let label4 = "label4.png";
let label5 = "label5.png";
let shelfimg = "shelf.png";
let backgrnd = "background.png";
let sorryBackgrndUrl = "sorry.png";
let correctBackgrndUrl = "correct.png";
let ohohBackgrndUrl = "Oh_oh.png";
let justBackgrndUrl = "just_missed.png";
let sorryBackgrnd, correctBackgrnd, ohohBackgrnd, justBackgrnd, timer, timeDifference, stuid, schoolid;
let answer = [];    //to store the question, the answer, time, result
let answers = [];   //to collate all the answer
let itemMoves = [];     //to store the details of items moved
let displayResult;
if (!isMaxMove)
    isExactMove = false;
let isChkMove = false;                     //use to check whether need to calculate moves
function chkMove() {
    if (isMaxMove) {
        isChkMove = !(cntMoves < maxMoves);
    }
    else
        isChkMove = false;
}

function setLevelandMoves() {
    $("#quest").text(questions[currentQuestion].question);
    targetLevel = questions[currentQuestion].target;
    maxMoves = questions[currentQuestion].maxMov;
    isExactMove = questions[currentQuestion].exactMove;

    if (maxMoves == -1) {
        isMaxMove = false;
        isExactMove = false;
    } else isMaxMove = true;
}
let myGameArea = {
    start: function () {
        canvas.width = $('#c').outerWidth();
        canvas.height = canvas.width * 0.45;
        let div = $('#c');
        div.append(canvas);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        mainCtx.clearRect(0, 0, canvas.width, canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}
function startGame() {
    // console.log("game started");
    numberOfQuestions = questions.length;
    elements.push(new component((canvas.width * 70 / 600), (canvas.height * 60 / 270), jar, (canvas.width * 110 / 600), (canvas.height * 3 / 270), "image", 1000));
    elements.push(new component((canvas.width * 65 / 600), (canvas.height * 50 / 270), jar, (canvas.width * 180 / 600), (canvas.height * 15 / 270), "image", 500));
    elements.push(new component((canvas.width * 60 / 600), (canvas.height * 40 / 270), jar, (canvas.width * 240 / 600), (canvas.height * 25 / 270), "image", 250));
    elements.push(new component((canvas.width * 50 / 600), (canvas.height * 40 / 270), jar, (canvas.width * 300 / 600), (canvas.height * 25 / 270), "image", 200));
    elements.push(new component((canvas.width * 40 / 600), (canvas.height * 35 / 270), jar, (canvas.width * 350 / 600), (canvas.height * 30 / 270), "image", 100));
    setLevelandMoves();
    myTank = new component((canvas.width * 150 / 600), (canvas.height * 180 / 270), tank, (canvas.width * 400 / 600), (canvas.height * 90 / 270), "image");
    textPos = new component(0, 0, 0, 0, 0, "text");
    backgroundImage = new component(canvas.width, canvas.height, backgrnd, 0, 0, "bgimage");
    shelf = new component((canvas.width * 350 / 600), (canvas.height * 100 / 270), shelfimg, (canvas.width * 80 / 600), (canvas.height * 50 / 270), "image");
    labels.push(new component((canvas.width * 50 / 600), (canvas.height * 20 / 270), label1, (canvas.width * 115 / 600), (canvas.height * 70 / 270), "image"));
    labels.push(new component((canvas.width * 50 / 600), (canvas.height * 20 / 270), label2, (canvas.width * 180 / 600), (canvas.height * 70 / 270), "image"));
    labels.push(new component((canvas.width * 50 / 600), (canvas.height * 20 / 270), label3, (canvas.width * 235 / 600), (canvas.height * 70 / 270), "image"));
    labels.push(new component((canvas.width * 50 / 600), (canvas.height * 20 / 270), label4, (canvas.width * 295 / 600), (canvas.height * 70 / 270), "image"));
    labels.push(new component((canvas.width * 50 / 600), (canvas.height * 20 / 270), label5, (canvas.width * 350 / 600), (canvas.height * 70 / 270), "image"));
    waterLevel = new component((canvas.width * 0 / 600), (canvas.height * 0 / 270), '#9499ff', (canvas.width * 415 / 600), (canvas.height * 260 / 270));
    displayResult = new component();
    sorryBackgrnd = new Image();
    sorryBackgrnd.src = sorryBackgrndUrl;
    correctBackgrnd = new Image();
    correctBackgrnd.src = correctBackgrndUrl;
    ohohBackgrnd = new Image();
    ohohBackgrnd.src = ohohBackgrndUrl;
    justBackgrnd = new Image();
    justBackgrnd.src = justBackgrndUrl;
    myGameArea.start();
}

$(document).ready(function () { startGame() });
// function getOffsetLeft(elem) {
//     let offsetLeft = 0;
//     do {
//         if (!isNaN(elem.offsetLeft)) {
//             offsetLeft += elem.offsetLeft;
//         }
//     } while (elem = elem.offsetParent);
//     return offsetLeft;
// }
// function getOffsetTop(elem) {
//     let offsetTop = 0;
//     do {
//         if (!isNaN(elem.offsetTop)) {
//             offsetTop += elem.offsetTop;
//         }
//     } while (elem = elem.offsetParent);
//     return offsetTop;
// }

let vesselMoveEvent = new MouseEvent("MouseEvent", {
    clientX: 100,
    clientY: 100
});
vesselMoveEvent.initEvent("vslMove");
let resizeObserver = new ResizeObserver(() => {

    canvas.width = $('#c').outerWidth();
    canvas.height = canvas.width * 0.45;
    resizeComponents();

});
function resizeComponents() {
    for (var i = 0; i < elements.length; i++) {
        console.log('water level x and y : ' + waterLevel.x + ', ' + waterLevel.y);
        switch (i) {
            case 0: elements[i].width = (canvas.width * 70 / 600);
                elements[i].height = (canvas.height * 60 / 270);
                elements[i].x = (canvas.width * 110 / 600);
                elements[i].y = (canvas.height * 3 / 270);
                labels[i].width = (canvas.width * 50 / 600); labels[i].height = (canvas.height * 20 / 270); labels[i].x = (canvas.width * 115 / 600); labels[i].y = (canvas.height * 70 / 270);
                break;
            case 1: elements[i].width = (canvas.width * 65 / 600);
                elements[i].height = (canvas.height * 50 / 270);
                elements[i].x = (canvas.width * 180 / 600);
                elements[i].y = (canvas.height * 15 / 270);
                labels[i].width = (canvas.width * 50 / 600); labels[i].height = (canvas.height * 20 / 270); labels[i].x = (canvas.width * 180 / 600); labels[i].y = (canvas.height * 70 / 270);
                break;
            case 2: elements[i].width = (canvas.width * 60 / 600);
                elements[i].height = (canvas.height * 40 / 270);
                elements[i].x = (canvas.width * 240 / 600);
                elements[i].y = (canvas.height * 25 / 270);
                labels[i].width = (canvas.width * 50 / 600); labels[i].height = (canvas.height * 20 / 270); labels[i].x = (canvas.width * 235 / 600); labels[i].y = (canvas.height * 70 / 270);
                break;
            case 3: elements[i].width = (canvas.width * 50 / 600);
                elements[i].height = (canvas.height * 40 / 270);
                elements[i].x = (canvas.width * 300 / 600);
                elements[i].y = (canvas.height * 25 / 270);
                labels[i].width = (canvas.width * 50 / 600); labels[i].height = (canvas.height * 20 / 270); labels[i].x = (canvas.width * 295 / 600); labels[i].y = (canvas.height * 70 / 270);
                break;
            case 4: elements[i].width = (canvas.width * 40 / 600);
                elements[i].height = (canvas.height * 35 / 270);
                elements[i].x = (canvas.width * 350 / 600);
                elements[i].y = (canvas.height * 30 / 270);
                labels[i].width = (canvas.width * 50 / 600); labels[i].height = (canvas.height * 20 / 270); labels[i].x = (canvas.width * 350 / 600); labels[i].y = (canvas.height * 70 / 270);
                break;
        }
        elements[i].initx = elements[i].x;
        elements[i].inity = elements[i].y;
    }
    myTank.width = (canvas.width * 150 / 600);
    myTank.height = (canvas.height * 180 / 270);
    myTank.x = (canvas.width * 400 / 600);
    myTank.y = (canvas.height * 90 / 270);
    shelf.width = (canvas.width * 350 / 600);
    shelf.height = (canvas.height * 100 / 270);
    shelf.x = (canvas.width * 80 / 600);
    shelf.y = (canvas.height * 50 / 270);
    waterLevel.width = (canvas.width * waterLevel.width / 600);
    // waterLevel.height = (canvas.height * waterLevel.height / 270);
    waterLevel.x = (canvas.width * 415 / 600)
    waterLevel.y = (canvas.height * 260 / 270);
    waterLevel.initx = waterLevel.x;
    waterLevel.inity = waterLevel.y;
    displayResult.width = canvas.width;
    displayResult.height = canvas.height;
}
resizeObserver.observe(document.getElementById('c'));


function canvasBackground(width, height, image, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = image;
    this.update = function () {
        mainCtx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function component(width, height, url, x, y, type, volume) {
    // console.log("checking this component function");
    this.type = type;
    if (type == "image" || type == "bgimage") {
        this.image = new Image();
        this.image.src = url;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.initx = x;
    this.inity = y;
    this.isReadytoMove = false;
    this.capacity = volume;

    this.update = function () {
        if (type == "image") {
            mainCtx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else if (type == "text") {
            this.message = "Water level is " + waterLevel.height * 100 + "mL. Moves used " + cntMoves;
            mainCtx.font = (canvas.width * 16 / 600) + "px Arial";
            mainCtx.fillStyle = "white";
            mainCtx.fillText(this.message, (canvas.width * 10 / 600), (canvas.height * 250 / 270));
        } else if (type == "bgimage") {
            mainCtx.drawImage(this.image,
                this.x,
                this.y,
                canvas.width, canvas.height);
        }
        else {
            mainCtx.fillStyle = url;
            mainCtx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function (x, y) {
        this.x = x;
        this.y = y;
    }
}
function getMousePos(canv, evt) {
    var rect = canv.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
canvas.addEventListener('mousedown', function (event) {
    var pos = getMousePos(canvas, event);
    var x = pos.x,
        y = pos.y;
    // console.log("clicks: " + x, y);
    elements.forEach(function (item) {

        // console.log(item.x, item.y);
        // console.log(item.width, item.height);
        if (y > item.y && y < item.y + item.height && x > item.x && x < item.x + item.width) {
            item.isReadytoMove = true;
            item.newPos(event.pageX - 20, event.pageY - 20);

        }
    });
}, false);

canvas.addEventListener('mouseup', function (event) {

    var pos = getMousePos(canvas, event);
    var x = pos.x,
        y = pos.y;
    elements.forEach(function (item) {
        if (y > item.y && y < item.y + item.height && x > item.x && x < item.x + item.width) {
            canvas.dispatchEvent(vesselMoveEvent);
            item.newPos(item.initx, item.inity);
            item.isReadytoMove = false;
        }
    });
}, false);
canvas.addEventListener('mousemove', function (event) {
    var pos = getMousePos(canvas, event);
    var x = pos.x,
        y = pos.y;
    elements.forEach(function (item) {
        if (item.isReadytoMove) {
            item.newPos(x - 20, y - 20);
        }
    });
}, false);
function resetGame() {
    waterLevel.height = 0;
    waterLevel.y = waterLevel.inity;
    cntMoves = 0;
    //           isChkMove=true;
}
function storeAnswersTemp() {
    answer.push($('#ans').text());
    answer.push(itemMoves);
    answer.push(timeDifference);
    itemMoves = [];
}
canvas.addEventListener("vslMove", function (e) {
    elements.forEach(function (item) {
        x = item.x;
        y = item.y;
        chkMove();
        if (y > myTank.y && y < myTank.y + myTank.height - 20 && x > myTank.x && x < myTank.x + myTank.width - 20 && item.isReadytoMove) {
            itemMoves.push(item.capacity);
            if ((!(waterLevel.height * 100 >= targetLevel)) && !isChkMove) {
                if (waterLevel.height * 100 + item.capacity <= targetLevel) {
                    waterLevel.width = myTank.width - (canvas.width * 28) / 600;
                    waterLevel.height += item.capacity / 100;
                    waterLevel.y -= item.capacity / 100;
                    cntMoves += 1;

                    if (!(waterLevel.height * 100 < targetLevel)) {
                        if (isExactMove) {
                            if (cntMoves < maxMoves) {
                                displayResult = new canvasBackground(canvas.width, canvas.height, justBackgrnd, 0, 0);
                                $('#ans').text("Filled the tank with less moves.");
                                $('#ans').removeClass();
                                $('#ans').addClass("bg-info");
                                $('#ans').addClass("text-light");
                            }
                            else {
                                displayResult = new canvasBackground(canvas.width, canvas.height, correctBackgrnd, 0, 0);
                                $('#ans').text("Correct. Congratulations.");
                                $('#ans').removeClass();
                                $('#ans').addClass("bg-success");
                                $('#ans').addClass("text-light");

                            }
                        } else {
                            displayResult = new canvasBackground(canvas.width, canvas.height, correctBackgrnd, 0, 0);
                            $('#ans').text("Correct. Congratulations.");
                            $('#ans').removeClass();
                            $('#ans').addClass("bg-success");
                            $('#ans').addClass("text-light");

                        }
                        $('#skipBtn').css("display", "none");
                        displayBtn();
                        stopTimer();
                        storeAnswersTemp();
                        resetGame();
                    }
                } else {
                    displayResult = new canvasBackground(canvas.width, canvas.height, sorryBackgrnd, 0, 0);
                    $('#ans').text("Water will spill.");
                    $('#ans').removeClass();
                    $('#ans').addClass("bg-secondary");
                    $('#ans').addClass("text-light");
                    $('#skipBtn').css("display", "none");
                    displayBtn();
                    stopTimer();
                    storeAnswersTemp();

                    resetGame();
                }
            } else {
                displayResult = new canvasBackground(canvas.width, canvas.height, ohohBackgrnd, 0, 0);
                $('#ans').text("You have crossed the maximum moves.");
                $('#ans').removeClass();
                $('#ans').addClass("bg-warning");
                $('#ans').addClass("text-light");
                $('#skipBtn').css("display", "none");
                displayBtn();
                stopTimer();
                storeAnswersTemp();
                resetGame();
            }
        }
    });
});

function displayBtn() {
    // console.log('inside function');
    if (currentQuestion < (numberOfQuestions - 1)) {
        $('#nxtBtn').css("display", "block");
        // console.log('inside condition');
    } else if (currentQuestion = numberOfQuestions) {
        $('#submitBtn').css("display", "block");
    }
}


function updateGameArea() {
    myGameArea.clear();
    backgroundImage.update();
    shelf.update();
    labels.forEach(function (lbl) {
        lbl.update();
    });
    elements.forEach(function (item) {
        item.update();
    });
    myTank.update();
    textPos.update();
    waterLevel.update();
    displayResult.update();
}
function doMoveNext() {
    answers.push(answer);
    answer = [];
    $('#quest').text(questions[++currentQuestion].question);
    // answer.push(stuid);
    answer.push(questions[currentQuestion]);
    $('#ans').text('Not answered');
    $('#ans').removeClass();
    setLevelandMoves();
    startTimer();
    $('#questStatus').text(currentQuestion + 1 + "/" + numberOfQuestions);
    resetGame();
    displayResult = new component();
}
function moveNext() {
    // stopTimer();
    $('#skipBtn').css("display", "block");
    $('#nxtBtn').css("display", "none");

    doMoveNext();
}

function skipQuestion() {
    stopTimer();
    if (currentQuestion < numberOfQuestions - 1) {
        doMoveNext();
    } else {
        submitAns();
        // document.getElementById('skipBtn').css("display", "none");
        // document.getElementById('submitBtn').style.display = "block";
    }
}

canvas.addEventListener('touchend', function (event) {

    canvas.dispatchEvent(vesselMoveEvent);
    elements.forEach(function (item) {
        item.newPos(item.initx, item.inity);
        item.isReadytoMove = false;
    });

}, false);
canvas.addEventListener('touchmove', function (event) {
    event.preventDefault();
    var rect = canvas.getBoundingClientRect();
    var x = event.touches[0].clientX - rect.left,
        y = event.touches[0].clientY - rect.top - (canvas.height * 30 / 270);
    // console.log("touches "+x,y);
    elements.forEach(function (item) {
        // console.log(item.x, item.y);
        // console.log(item.width, item.height);
        if (y > item.y && y < item.y + item.height && x > item.x && x < item.x + item.width) {
            item.isReadytoMove = true;
            item.newPos(x - (canvas.height * 20 / 270), y - (canvas.height * 20 / 270));
        }
    });

}, false);
function startQuiz() {
    // console.table(questions);
    $('.nav-link')[2].setAttribute('onclick', 'alert("you can not edit question while playing.")');
    if (selectedQuestions.length)
        questions = selectedQuestions;
    else
        setQuestions();
    setLevelandMoves();
    numberOfQuestions = questions.length;
    $("#c").css("display", "block");
    schoolid = $('#udise').val();
    stuid = $('#stuid').val();
    $('#studentDetailEnquire').css("display", "none");

    $('#studentDetails').css("display", "block");
    $('#studentDetails').children().first().text("Student's ID: " + stuid);
    // answer.push(stuid);
    answer.push(questions[currentQuestion]);
    $('#pnote').css("display", "block");
    $('#questionTable').css("display", "block");
    $('#questStatus').text(currentQuestion + 1 + "/" + numberOfQuestions);
    $('#divStatus').css("display", "block");
    $('#divStatus').addClass('d-flex');
    startTimer();
}
function submitAns() {
    stopTimer();
    answers.push(answer);
    // console.table(answers);
    $('#divDetails').css("display", "none");
    $('#c').css("display", "none");
    $('#pnote').css("display", "none");
    $('#score').css("display", "block");
    createAnsTable(answers);
    $('.nav-link')[2].setAttribute("onclick", "displayTab('divEdit', this)");
}


function startTimer() {
    var startTime = new Date().getTime();
    timer = setInterval(function () {
        var now = new Date().getTime();
        timeDifference = now - startTime;
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        // console.log(minutes);
        $('#timer').text(minutes + ":" + seconds);
    }, 500);
}

function stopTimer() {
    // console.log("trying to stop timer");
    clearInterval(timer);
    // $('#timer').innerText="";
}

function createAnsTable(tableData) {       //creating answer table
    document.getElementById('score_school_ID').innerHTML = schoolid;
    document.getElementById('score_student_ID').innerHTML = stuid;
    setFinalScore();
    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');

        for (i = 0; i < rowData.length; i++) {
            var cell = document.createElement('td');
            switch (i) {
                case 0: cell.appendChild(document.createElement('b'));
                    cell.appendChild(document.createTextNode(rowData[i].question));
                    break;
                case 2: var text = "";
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

function reload() {
    answers = [];
    answer = [];
    itemMoves = [];
    currentQuestion = 0;
    $('#divDetails').css("display", "block");
    $('#studentDetailEnquire').css("display", "block");
    $('#studentDetails').css("display", "none");
    $('#questionTable').css("display", "none");
    $('#divStatus').removeClass('d-flex');
    $('#divStatus').css("display", "none");
    $('#score').css("display", "none");
    $('#submitBtn').css("display", "none");
    $('#nxtBtn').css("display", "none");
    $('#skipBtn').css("display", "block");
    $('#tbdy').html("");
    setLevelandMoves();
    resetGame();
    displayResult = new component();
    $('#ans').text("Not answered");
    $('#ans').removeClass();
}

function uploadReport() {
    Papa.parse(myfile.files[0], {
        complete: function (results) {
            // console.log(results);
            var tempQuestions = [];

            (results.data).forEach(function (item) {
                var tempQuestion = {};
                var i = 0;
                item.forEach(function (cell) {
                    switch (i) {
                        case 0: tempQuestion.target = parseInt(cell);
                            // console.log(parseInt(cell));
                            break;
                        case 1: tempQuestion.maxMov = parseInt(cell);
                            // console.log(parseInt(cell));
                            break;
                        case 2: tempQuestion.exactMove = trueOrfalse(cell);
                            // console.log(tempQuestion.exactMove);
                            break;
                        case 3: tempQuestion.question = cell;
                            // console.log(cell);
                            break;
                        default: console.log("some error");
                    }
                    i++;
                });
                if (!(isNaN(tempQuestion.target)))
                    tempQuestions.push(tempQuestion);
            });
            // console.table(tempQuestions);
            questions = tempQuestions;
            createQuestionsTable(questions);
            $('#myfile').value = "";
        },
        error: function (e) {
            console.log('error while reading csv file... the details are\n' + e);
        }
    });
}

function dwnloadAns() {
    let csvContent = "data:text/csv;charset=utf-8,";
    var dataString = "School ID\tStudent ID\tTarget (in mL)\tMaximum Moves\tExact Move\tQuestion\tResult\tPlayed Moves\tTime (in milli second)\n";
    answers.forEach(function (row) {
        dataString += "" + schoolid + "\t";
        dataString += "" + stuid + "\t";
        row.forEach(function (cell) {
            if (Array.isArray(cell)) {
                dataString += cell.join(", ");
                dataString += "\t";
            }
            else if (typeof cell === 'object' && cell !== null) {
                // console.log("in 554 line \n" + Object.values(i));
                dataString += "" + Object.values(cell).join("\t");
                dataString += "\t";
            } else {
                dataString += "" + cell + "\t";
                // console.log('in 560');
                // console.log(dataString);
            }
        });
        dataString += "\n";
    });
    // var encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
    // console.log(dataString);
    csvContent += dataString;
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    var dt = new Date();
    var filename = "LitreResult_" + stuid + "_" + dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear() + "_"
        + dt.getHours() + "_" + dt.getMinutes() + "_" + dt.getSeconds();
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
}
function displayTab(tabid, element) {
    $('.tabContent').css("display", "none");



    // tabs.forEach(function(e){
    //     e.style.display = "none";
    // });

    $('#' + tabid).css("display", "block");
    var linkTags = $('.nav-item');

    for (i = 0; i < linkTags.length; i++) {
        linkTags[i].classList.remove('active');
        // linkTags[i].classList.remove('active');

    }
    // linkTags.forEach(function(e){
    //     e.classList.remove('active');
    // });
    element.parentElement.classList.add('active');
    if (element.innerText === 'Edit Questions') {
        createQuestionsTable(questions);
        updateQuestionSet();
    }
}

function createQuestionsTable(tableData) {
    $('#tQbdy').html("");
    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');
        // console.log(Object.values(rowData));
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

function saveQuestions() {
    // console.table(questions);
    questions = [];
    $('.hideColumn').css('display', 'none');

    $('#addBtn').attr('disabled', true);
    $('#saveBtn').attr('disabled', true);
    $('#editBtn').attr('disabled', false);
    $('#inQuestion').css("display", "none");
    var tableBody = $('#tQbdy');
    for (i = 0; i < tableBody.children().length; i++) {
        var ele = tableBody.children().eq(i);
        questions.push({
            target: parseInt(ele.children().first().text()),
            maxMov: parseInt(ele.children().eq(1).text()),
            exactMove: trueOrfalse(ele.children().eq(2).text()),
            question: ele.children().eq(3).text()
        });
    }
    $('.nav-link').first().attr('onclick', "displayTab('divAbt', this)");
    $('.nav-link').eq(1).attr('onclick', "displayTab('divPlay', this)");
    // console.table(questions);
}

function trueOrfalse(str) {
    // console.log(str.toUpperCase())
    if (str.toUpperCase() == 'TRUE')
        return true;
    else
        return false;
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

function dwnloadQues() {
    let csvContent = "data:text/csv;charset=utf-8,"
        + "Target (in mL)\tMaximum Moves\tExact Move\tQuestion\n"
        + questions.map(e => Object.values(e).join("\t")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    var dt = new Date();
    var filename = "LitreQuestions_" + dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear() + "_"
        + dt.getHours() + "_" + dt.getMinutes() + "_" + dt.getSeconds();
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
}

function addQuestion() {
    var targetInput = $("[name='target']:first");
    var maxMoveInput = $("[name='maxMove']:first");
    var exactMoveInput = $("[name='exactMove']:first");
    var questionInput = $("[name='question']:first");

    if ((parseInt(targetInput.val()) >= 200) && (parseInt(targetInput.val()) % 50 == 0))
        if (parseInt(maxMoveInput.val()) >= -1)
            if (exactMoveInput.val() !== "")
                if (questionInput.val() !== "") {
                    var row = document.createElement('tr');
                    var cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(targetInput.val()));
                    row.appendChild(cell);
                    cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(maxMoveInput.val()));
                    row.appendChild(cell);
                    cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(exactMoveInput.val()));
                    row.appendChild(cell);
                    cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(questionInput.val()));
                    row.appendChild(cell);
                    cell = document.createElement('td');
                    cell.classList.add('hideColumn');
                    // cell.style.display = "none";
                    cell.innerHTML = '<a class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">X</a>';
                    row.appendChild(cell);
                    $('#tQbdy').append(row);
                    targetInput.val("");
                    maxMoveInput.val("");
                    exactMoveInput.val("");
                    questionInput.val("");
                } else {
                    questionInput.focus();
                    alert('You missed to type question.');
                } else {
                exactMoveInput.focus();
                alert('You missed to fill exact Move option.')
            } else {
            maxMoveInput.focus();
            alert('You missed to type maximum moves.');
        } else {
        targetInput.focus();
        alert('You missed to type target.');
    }
}

function deletRow(rowtag) {
    // console.log(this);
    this.parentElement.remove();
}


function addClickEvent_CardElement() {
    document.querySelectorAll('#questionSetdiv .card').forEach((ele) => {
        // console.log(ele);
        ele.addEventListener('click',
            (event) => {
                var k = event.currentTarget.children[0].children[0].children[0].textContent;
                console.log(parseInt(k));
                console.table(questionSet[parseInt(k) - 1])
                selectedQuestions = questionSet[parseInt(k) - 1];
                createQuestionsTable(selectedQuestions);
                displayTab('divPlay', $('.nav-item').eq(1).children()[0]);
                questions = selectedQuestions;
            }
        );
    });
}


function setFinalScore() {
    $('#finalScore').text(function () {
        var correctAns = answers.filter(item => item[1] == 'Correct. Congratulations.').length;
        var partialCorrect = answers.filter(item => item[1] == 'Filled the tank with less moves.').length;
        var incomplete = answers.filter(item => item[1] == 'You have crossed the maximum moves.').length;
        var incorrect = answers.filter(item => item[1] == 'Water will spill.').length;
        var skipped = answers.filter(item => !item[1]).length;
        var totalQuestions = answers.length;
        var chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    ['Correct Answers', correctAns],
                    ['Partially Correct Answers', partialCorrect],
                    ['Incomplete Answers', incomplete],
                    ['Wrong Answers', incorrect],
                    ['Not attended', skipped]
                ],
                colors:{
                    'Correct Answers': 'rgb(44, 160, 44)',
                    'Partially Correct Answers': 'rgb(31, 119, 180)',
                    'Incomplete Answers': 'rgb(255, 127, 14)',
                    'Wrong Answers': 'rgb(214, 39, 40)',
                    'Not attended': 'hsl(0, 0%, 57%)'
                },
                type: 'pie',
                // pie: {
                //     label:{
                //         format: function (value, ratio, id) {
                //             return d3.format(value);
                //         }
                //     }
                // },
                onclick: function (d, i) { console.log("onclick", d, i); },
                // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
        return ((correctAns * 2) + (partialCorrect * 1) + ' / ' + totalQuestions * 2);
    });
}