let trackPlayerTimer, dragSrcEl, starCounter = 0, lastDroppedInbox, currentYesOrNoQuestion = 0, resumeTime;
let yesOrNoQuestion = [
    [2, 8],
    [3, 9],
    [2, 5],
    [4, 10],
    [3, 15]
];



var player = videojs(document.querySelector('#my-video'), {
    controls: true,
    autoplay: false,
    preload: 'auto'
}, function () {
    console.log('player ready 1');
});

player.ready(function () {
    console.log('player ready');
});

player.on('play', function () {
    console.log('it is playing...');
    if (trackPlayerTimer) {
        clearInterval(trackPlayerTimer);
    }
    trackPlayerTimer = setInterval(function () { trackCurrentPlaybackTime(); }, 500);
});
player.on('pause', function () {
    console.log('it is paused...');
    clearInterval(trackPlayerTimer);
});
player.on('ended', function () {
    console.log('it ended...');
    clearInterval(trackPlayerTimer);
});
function trackCurrentPlaybackTime() {
    // console.log(player.currentTime());
    if (player.currentTime() <= 39 && player.currentTime() >= 38) {
        console.log('got the time...');
        player.pause();
        showDiv('#Interaction1');
        resumeTime = 39.5;
    }
    if (player.currentTime() <= 72 && player.currentTime() >= 71) {
        console.log('got the time...' + player.currentTime());
        player.pause();
        showDiv('#Interaction2');
        resumeTime = 72.5;
    }
    if (player.currentTime() <= 229 && player.currentTime() >= 228) {
        player.pause();
        console.log('got the time...' + player.currentTime());
        showDiv('#Interaction4');
        currentYesOrNoQuestion = -1;
        nxtQuestion();
        resumeTime = 229.5;
    }
}
function showDiv(divId) {
    player.hide();
    var interactionDiv = document.querySelector(divId);
    interactionDiv.style.display = 'block';
    interactionDiv.classList.add('active');
    // interactionDiv.style.opacity = 1;
}

function wrongSelection(ele) {
    ele.style.color = 'red';
    $(ele).popover('show');
    setTimeout(function () {
        $(ele).popover('hide');
    }, 1500)
}

function correctSelection(ele) {
    ele.style.color = 'rgb(60, 255, 0)';
    resumeVideo(ele.parentNode.parentNode);
    // $('#Interaction1').css('display','none');
    $('#my-video').css('display', 'block');
    player.show();
    player.currentTime(resumeTime);
    player.play();
}


function handleDragStart(e) {
    e.target.style.opacity = '0.4';
    dragSrcEl = this;
    // e.dataTransfer.effectAllowed = 'move';
    // e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    e.stopPropagation();
    var dividend = document.getElementById('yesOrNoQuestion').dataset.dividend;
    var divisor = document.getElementById('yesOrNoQuestion').dataset.divisor;
    if (starCounter % divisor == Array.from(this.parentNode.children).indexOf(this)) {
        this.appendChild(dragSrcEl);
        dragSrcEl.setAttribute('draggable', 'false');
        dragSrcEl.removeEventListener('dragend', function () { });
        dragSrcEl.style.cursor = "default";
        starCounter++;
    } else {
        console.log('kindly drop one star in each box');
        $('#arrangeStarsDiv').popover('show');
        setTimeout(function () {
            $('#arrangeStarsDiv').popover('hide');
        }, 1500);
    }

    if (starCounter >= dividend) {
       showResultDiv();
    }
}

function showResultDiv() {
    var dividend = document.getElementById('yesOrNoQuestion').dataset.dividend;
    var divisor = document.getElementById('yesOrNoQuestion').dataset.divisor;

    var divisble = (dividend % divisor == 0) ? '' : 'not';
    $('#resultDiv').html('');
    $('#resultDiv').append($(`<p style="margin: auto;">See we can ${divisble} evenly distribute the stars.</p>`));
    $('#resultDiv').append($(`<p style="margin: auto;">So ${divisor} is ${divisble} a factor of ${dividend}. <span onclick="nxtQuestion()" style="cursor: pointer; padding: 5px; margin-left: 20px; background-color: green; color: white; border-radius:5px">Next</span></p>`));
    document.querySelector('#resultDiv').style.display = 'block';
    document.getElementById('arrangeStarsDiv').firstElementChild.style.display = 'none';

}

function checkFactor(ele, response) {
    var yesOrNoQuestionEle = document.getElementById('yesOrNoQuestion');
    if (response == 'n') {
        if (yesOrNoQuestionEle.dataset.dividend % yesOrNoQuestionEle.dataset.divisor == 0) {
            showWrong(ele);
        } else {
            showCorrect(ele);
            nxtQuestion();
        }
    } else if (response == 'y') {
        if (yesOrNoQuestionEle.dataset.dividend % yesOrNoQuestionEle.dataset.divisor == 0) {
            showCorrect(ele);
            nxtQuestion();
        }
        else {
            showWrong(ele);
        }
    }
}
function showCorrect(ele) {
    ele.setAttribute('data-content', 'Correct!');
    $(ele).popover('show');
    setTimeout(function () { $(ele).popover('hide') }, 2000);
}

function showWrong(ele) {
    ele.setAttribute('data-content', 'Sorry you are wrong!');
    $(ele).popover('show');
    setTimeout(function () { $(ele).popover('hide') }, 2000);
    $('#arrangeStarsDiv').css('display', 'block');
    setArrangeStarsDiv(document.getElementById('yesOrNoQuestion'));
}

function nextYesorNoQuestion() {
    // currentYesOrNoQuestion++;
    var yesOrNoQuestionEle = document.getElementById('yesOrNoQuestion');
    yesOrNoQuestionEle.innerHTML = `Is ${yesOrNoQuestion[currentYesOrNoQuestion][0]} a factor of ${yesOrNoQuestion[currentYesOrNoQuestion][1]}`;
    yesOrNoQuestionEle.setAttribute('data-dividend', yesOrNoQuestion[currentYesOrNoQuestion][1]);
    yesOrNoQuestionEle.setAttribute('data-divisor', yesOrNoQuestion[currentYesOrNoQuestion][0]);
    $('#arrangeStarsDiv').css('display', 'none');
    $('#resultDiv').css('display', 'none');
}

function setArrangeStarsDiv(ele) {
    starCounter = 0;
    var arrangeStarEle = document.getElementById('arrangeStarsDiv');
    // console.log(arrangeStarEle.children[2]);

    arrangeStarEle.firstElementChild.innerHTML = `Arrange ${ele.dataset.dividend} stars in ${ele.dataset.divisor} groups by drag and drop or click the Arrange button`;

    arrangeStarEle.children[1].innerHTML = "";
    for (var i = 0; i < ele.dataset.dividend; i++) {
        var starEle = $('<span class="star" draggable="true">&#9733;</span>')
        $(arrangeStarEle.children[1]).append(starEle);
    }
    $(arrangeStarEle.children[1]).append(
        $('<span class="arrangeBtn" onclick="moveStar(this)">Arrange</span>'));
    arrangeStarEle.children[2].innerHTML = "";
    for (var i = 0; i < ele.dataset.divisor; i++) {
        var inboxEle = $('<div class="inbox"></div>');
        $(arrangeStarEle.children[2]).append(inboxEle);
    }
    var stars = document.querySelectorAll('.star');
    var inboxes = document.querySelectorAll('.inbox');
    stars.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    inboxes.forEach(function (item) {
        item.classList.remove('over');
    });
    stars.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart);
        // item.addEventListener('touchstart', fireCustomEvent('dragstart', item, item.innerHTML));
        item.addEventListener('dragend', handleDragEnd);
        // item.addEventListener('touchend', fireCustomEvent('dragend', item, item.innerHTML));
    });
    inboxes.forEach(function (item) {
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
    });
}

function moveStar(ele) {
    var stars = document.querySelectorAll('.star');
    var inboxes = document.querySelectorAll('.inbox');
    stars.forEach((star, i) => {
        inboxes[i % inboxes.length].append(star);
    });
    ele.remove();
    showResultDiv();
}

function nxtQuestion() {
    
    currentYesOrNoQuestion++;
    if (yesOrNoQuestion.length > currentYesOrNoQuestion)
        nextYesorNoQuestion();
    else {
        resumeVideo(document.getElementById('Interaction4'));
    }
}

function resumeVideo(elementToHide) {
    $(elementToHide).css('display', 'none');
    $('#my-video').css('display', 'block');
    player.show();
    player.currentTime(resumeTime);
    player.play();
}