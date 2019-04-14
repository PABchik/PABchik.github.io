



var canvas = document.createElement('canvas');

var imgSource = "https://source.unsplash.com/collection/1127163/";

collageX = 700;
collageY = 700;

canvas.width = collageX;
canvas.height = collageY;

var ctx = canvas.getContext('2d');


var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();


img1.src = imgSource + getRandomInt(collageX * 0.33, collageX * 0.5) + "x" + getRandomInt(collageY * 0.33, collageY * 0.5);
img1.onload = function() {
    ctx.drawImage(img1, 0, 0);
    img2.src = imgSource + (collageX - img1.width) + "x" + getRandomInt(collageY * 0.45, collageY * 0.7);
    img2.onload = function() {
        ctx.drawImage(img2, img1.width, 0);
        img3.src = imgSource + img1.width + "x" + (collageY - img1.height);
        img3.onload = function() {
            ctx.drawImage(img3, 0, img1.height);
            img4.src = imgSource + img2.width + "x" + (collageY - img2.height);
            img4.onload = function() {
                ctx.drawImage(img4, img1.width, img2.height);
                console.log("img1:   width: " + img1.width + ", height: " + img1.height);
                console.log("img2:   width: " + img2.width + ", height: " + img2.height);
                console.log("img3:   width: " + img3.width + ", height: " + img3.height);
                console.log("img4:   width: " + img4.width + ", height: " + img4.height);
                addMask();
                addQuote();
            }
        }
    }
}





document.body.appendChild(canvas);


function addMask() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.fillRect(0, 0, collageX, collageY);
}

function addQuote() {
    ctx.fillStyle = "rgb(114,115,115)";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=ru", false);
    xhr.onload = function () {
        console.log(xhr.responseText);
    };
    xhr.send();
    alert(JSON.parse(xhr.responseText).quoteText);


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
