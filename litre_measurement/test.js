let svgEle;
let backgroundImage, shelf;
let myTank;
let elements = [];
let labels = [];
let tank = "tank.png";
let jar = "jar.png";
let label1 = "label1.png";
let label2 = "label2.png";
let label3 = "label3.png";
let label4 = "label4.png";
let label5 = "label5.png";
let shelfimg = "shelf.png";
let backgrnd = "background.png";
$(function () {
    svgEle = $('#c svg');
    console.log(svgEle.attr('width'));
    resizeObserver.observe(document.getElementById('c'));

});

let resizeObserver = new ResizeObserver(() => {
    svgEle.attr('width', $('#c').outerWidth());
    svgEle.attr('height', svgEle.attr('width') * 0.45);
    
    resizeComponents();
    
    

});
// let ele = $('#c');



function scaleCanvas() {
    // console.log('div\'s outer height is ' + $('#c').outerHeight());
    // console.log('canvas height is ' + canvas.height);

    // mainCtx.scale(($('#c').outerWidth()-10)/canvas.width, (canvas.width*0.45)/canvas.height);
    mainCtx.scale(1, 1);
}


function resizeComponents() {

    $('#tank').attr('width', ((svgEle.attr('width') * 130 / 600)));
    $('#tank').attr('x', ((svgEle.attr('width') * 450 / 600)));
    $('#tank').attr('y', ((svgEle.attr('height') * 90 / 270)));

    $('#shelf').attr('width', ((svgEle.attr('width') * 350 / 600)));
    $('#shelf').attr('x', ((svgEle.attr('width') * 80 / 600)));
    $('#shelf').attr('y', ((svgEle.attr('height') * 50 / 270)));

    $('#jar1').attr('width', ((svgEle.attr('width') * 70 / 600)));
    $('#jar1').attr('height', ((svgEle.attr('height') * 70 / 270)));
    $('#jar1').attr('x', ((svgEle.attr('width') * 110 / 600)));
    $('#jar1').attr('y', ((svgEle.attr('height') * 3 / 270)));
    
    $('#jar2').attr('width', ((svgEle.attr('width') * 63 / 600)));
    $('#jar2').attr('height', ((svgEle.attr('height') * 63 / 270)));
    $('#jar2').attr('x', ((svgEle.attr('width') * 180 / 600)));
    $('#jar2').attr('y', ((svgEle.attr('height') * 8 / 270)));

    $('#jar3').attr('width', ((svgEle.attr('width') * 58 / 600)));
    $('#jar3').attr('height', ((svgEle.attr('height') * 58 / 270)));
    $('#jar3').attr('x', ((svgEle.attr('width') * 245 / 600)));
    $('#jar3').attr('y', ((svgEle.attr('height') * 13 / 270)));

    $('#jar4').attr('width', ((svgEle.attr('width') * 50 / 600)));
    $('#jar4').attr('height', ((svgEle.attr('height') * 50 / 270)));
    $('#jar4').attr('x', ((svgEle.attr('width') * 310 / 600)));
    $('#jar4').attr('y', ((svgEle.attr('height') * 20 / 270)));

    $('#jar5').attr('width', ((svgEle.attr('width') * 40 / 600)));
    $('#jar5').attr('height', ((svgEle.attr('height') * 40 / 270)));
    $('#jar5').attr('x', ((svgEle.attr('width') * 370 / 600)));
    $('#jar5').attr('y', ((svgEle.attr('height') * 28 / 270)));

    $('#lbl1').attr('width', ((svgEle.attr('width') * 50 / 600)));
    $('#lbl1').attr('x', ((svgEle.attr('width') * 110 / 600)));
    $('#lbl1').attr('y', ((svgEle.attr('height') * 73 / 270)));

    $('#lbl2').attr('width', ((svgEle.attr('width') * 50 / 600)));
    $('#lbl2').attr('x', ((svgEle.attr('width') * 180 / 600)));
    $('#lbl2').attr('y', ((svgEle.attr('height') * 73 / 270)));

    $('#lbl3').attr('width', ((svgEle.attr('width') * 50 / 600)));
    $('#lbl3').attr('x', ((svgEle.attr('width') * 245 / 600)));
    $('#lbl3').attr('y', ((svgEle.attr('height') * 73 / 270)));

    $('#lbl4').attr('width', ((svgEle.attr('width') * 50 / 600)));
    $('#lbl4').attr('x', ((svgEle.attr('width') * 305 / 600)));
    $('#lbl4').attr('y', ((svgEle.attr('height') * 73 / 270)));

    $('#lbl5').attr('width', ((svgEle.attr('width') * 50 / 600)));
    $('#lbl5').attr('x', ((svgEle.attr('width') * 360 / 600)));
    $('#lbl5').attr('y', ((svgEle.attr('height') * 73 / 270)));

    $('#background').attr('width', (svgEle.attr('width')));
    $('#background').attr('height', (svgEle.attr('height')));

    $('#waterlevel').attr('width', ((svgEle.attr('width') * 110 / 600)));
    $('#waterlevel').attr('height', ((svgEle.attr('height') * 0 / 270)));
    $('#waterlevel').attr('x', ((svgEle.attr('width') * 460 / 600)));
    $('#waterlevel').attr('y', ((svgEle.attr('height') * 251 / 270)));


}

// $('#jar1').on('mousedown',function(e){
//     e.target.x =
// });

$('#jar1').on('mousedown', function (event) {
    console.log('mouse down');
    $('#jar1').attr('draggable', true);
});
$('#jar1').on('mouseup', function (event) {
    console.log('mouse up');
    
    $('#jar1').attr('x', ((svgEle.attr('width') * 110 / 600)));
    $('#jar1').attr('y', ((svgEle.attr('height') * 3 / 270)));
    $('#jar1').attr('draggable', false);
});
$('#jar1').on('mousemove', function (event) {
    if ($('#jar1').attr('draggable')==='true') {
        $('#jar1').attr('x', event.clientX-(parseInt($('#jar1').attr('width'))/2));
        $('#jar1').attr('y', event.clientY-(parseInt($('#jar1').attr('height'))/2));
        
    }
});


$('#jar2').on('mousedown', function (event) {
    console.log('mouse down');
    $('#jar2').attr('draggable', true);
});
$('#jar2').on('mouseup', function (event) {
    console.log('mouse up');
    
    $('#jar2').attr('x', ((svgEle.attr('width') * 180 / 600)));
    $('#jar2').attr('y', ((svgEle.attr('height') * 8 / 270)));
    $('#jar2').attr('draggable', false);
});
$('#jar2').on('mousemove', function (event) {
    if ($('#jar2').attr('draggable')==='true') {
        $('#jar2').attr('x', event.clientX-(parseInt($('#jar2').attr('width'))/2));
        $('#jar2').attr('y', event.clientY-(parseInt($('#jar2').attr('height'))/2));
        
    }
});


$('#jar3').on('mousedown', function (event) {
    console.log('mouse down');
    $('#jar3').attr('draggable', true);
});
$('#jar3').on('mouseup', function (event) {
    console.log('mouse up');
    
    $('#jar3').attr('x', ((svgEle.attr('width') * 245 / 600)));
    $('#jar3').attr('y', ((svgEle.attr('height') * 13 / 270)));
    $('#jar3').attr('draggable', false);
});
$('#jar3').on('mousemove', function (event) {
    if ($('#jar3').attr('draggable')==='true') {
        $('#jar3').attr('x', event.clientX-(parseInt($('#jar3').attr('width'))/2));
        $('#jar3').attr('y', event.clientY-(parseInt($('#jar3').attr('height'))/2));
        
    }
});

$('#jar4').on('mousedown', function (event) {
    console.log('mouse down');
    $('#jar4').attr('draggable', true);
});
$('#jar4').on('mouseup', function (event) {
    console.log('mouse up');
    
    $('#jar4').attr('x', ((svgEle.attr('width') * 310 / 600)));
    $('#jar4').attr('y', ((svgEle.attr('height') * 20 / 270)));
    $('#jar4').attr('draggable', false);
});
$('#jar4').on('mousemove', function (event) {
    if ($('#jar4').attr('draggable')==='true') {
        $('#jar4').attr('x', event.clientX-(parseInt($('#jar4').attr('width'))/2));
        $('#jar4').attr('y', event.clientY-(parseInt($('#jar4').attr('height'))/2));
        
    }
});


$('#jar5').on('mousedown', function (event) {
    console.log('mouse down');
    $('#jar5').attr('draggable', true);
});
$('#jar5').on('mouseup', function (event) {
    console.log('mouse up');
    
    $('#jar5').attr('x', ((svgEle.attr('width') * 370 / 600)));
    $('#jar5').attr('y', ((svgEle.attr('height') * 28 / 270)));
    $('#jar5').attr('draggable', false);
});
$('#jar5').on('mousemove', function (event) {
    if ($('#jar5').attr('draggable')==='true') {
        $('#jar5').attr('x', event.clientX-(parseInt($('#jar5').attr('width'))/2));
        $('#jar5').attr('y', event.clientY-(parseInt($('#jar5').attr('height'))/2));
        
    }
});
function startDrag(event){
    // event.preventDefault();
    console.log('started to drag '+ event.target.id);
}

function drag(event){
    // event.preventDefault();
    console.log('draging the '+ event.target.id);
}

document.getElementById('jar1').addEventListener('touchmove',function(event){
    event.preventDefault();
        $('#jar1').attr('x', event.touches[0].clientX-(parseInt($('#jar1').attr('width'))/2));
        $('#jar1').attr('y', event.touches[0].clientY-(parseInt($('#jar1').attr('height'))/2));
}, false);
document.getElementById('jar1').addEventListener('touchend',function(event){
    $('#jar1').attr('x', ((svgEle.attr('width') * 110 / 600)));
    $('#jar1').attr('y', ((svgEle.attr('height') * 3 / 270)));
}, false);
document.getElementById('jar2').addEventListener('touchmove',function(event){
    event.preventDefault();
        $('#jar2').attr('x', event.touches[0].clientX-(parseInt($('#jar2').attr('width'))/2));
        $('#jar2').attr('y', event.touches[0].clientY-(parseInt($('#jar2').attr('height'))/2));
}, false);
document.getElementById('jar2').addEventListener('touchend',function(event){
    $('#jar2').attr('x', ((svgEle.attr('width') * 180 / 600)));
    $('#jar2').attr('y', ((svgEle.attr('height') * 8 / 270)));
}, false);
document.getElementById('jar3').addEventListener('touchmove',function(event){
    event.preventDefault();
        $('#jar3').attr('x', event.touches[0].clientX-(parseInt($('#jar3').attr('width'))/2));
        $('#jar3').attr('y', event.touches[0].clientY-(parseInt($('#jar3').attr('height'))/2));
}, false);
document.getElementById('jar3').addEventListener('touchend',function(event){    
    $('#jar3').attr('x', ((svgEle.attr('width') * 245 / 600)));
    $('#jar3').attr('y', ((svgEle.attr('height') * 13 / 270)));
}, false);
document.getElementById('jar4').addEventListener('touchmove',function(event){
    event.preventDefault();
        $('#jar4').attr('x', event.touches[0].clientX-(parseInt($('#jar4').attr('width'))/2));
        $('#jar4').attr('y', event.touches[0].clientY-(parseInt($('#jar4').attr('height'))/2));
}, false);
document.getElementById('jar4').addEventListener('touchend',function(event){    
    $('#jar4').attr('x', ((svgEle.attr('width') * 310 / 600)));
    $('#jar4').attr('y', ((svgEle.attr('height') * 20 / 270)));
}, false);

document.getElementById('jar5').addEventListener('touchmove',function(event){
    event.preventDefault();
    
        $('#jar5').attr('x', event.touches[0].clientX-(parseInt($('#jar5').attr('width'))/2));
        $('#jar5').attr('y', event.touches[0].clientY-(parseInt($('#jar5').attr('height'))/2));
        
    
}, false);
document.getElementById('jar5').addEventListener('touchend',function(event){

    $('#jar5').attr('x', ((svgEle.attr('width') * 370 / 600)));
    $('#jar5').attr('y', ((svgEle.attr('height') * 28 / 270)));
}, false);

// document.getElementById('tank').addEventListener('')