



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
img1.crossOrigin = "anonymous";
img2.crossOrigin = "anonymous";
img3.crossOrigin = "anonymous";
img4.crossOrigin = "anonymous";


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
				addDownloadBtn(); 


            }
        }
    }
}








document.body.appendChild(canvas);

function addDownloadBtn() {
	var a = document.createElement('a');
	a.href = canvas.toDataURL("image/jpeg");
	a.download = "generated_collage.jpg"
	a.innerHTML = "Download collage"
	a.style = "padding: 15px; margin-top:" + (100 + collageY) + "px;font-size: 20px;color:grey; text-decoration:none;";
	document.body.appendChild(a);
}


function addMask() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.fillRect(0, 0, collageX, collageY);
}

function addQuote() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://thesimpsonsquoteapi.glitch.me/quotes", false);
    xhr.onload = function () {
        console.log(xhr.responseText);
    };
    xhr.send();
    var response = JSON.parse(xhr.responseText);

    console.log(response[0].quote);
    var quote = response[0].quote;
    // alert(quote);
    var mas = quote.split(' ');

    ctx.font = "italic 30pt Arial";
    console.log(mas);
    var wordsInLineCount = Math.floor(collageX / 100 - 3);

    console.log("wordlineCount: " + wordsInLineCount);
    // ctx.textAlign = "center";
    for (var i = 0; i < mas.length; i = i + wordsInLineCount) {
        var str = "";
        for (var j = i; j < i + wordsInLineCount; j++) {
            if (j < mas.length)
                str += mas[j] + " ";
            console.log("inner iteration i:" + i + "j: " + j );
        }
        console.log("str = " + str);
        ctx.fillText(str, 50, 150 + i * 10);
    }
    ctx.fillText(response[0].character, collageX * 0.4, collageY * 0.8);

}


function quoteWrap(qoute) {


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
