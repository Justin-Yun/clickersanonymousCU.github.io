var bg;
var appleImg;
var handImg;
var wheatImg;
var houseImg;
var barnImg;
var collected;
var applesPerS;
var AC;
var WH;
var HO;
var CO;
var reqAC;
var reqWH;
var reqHO;
var reqCO;
var secs = setInterval(dApples, 1000);

function setup() {
	var canvas = createCanvas(1080, 540);
	handImg = loadImage("https://raw.githubusercontent.com/clickersanonymousCU/clickersanonymousCU.github.io/master/graphics/hand-o-pointer.png");
	wheatImg = loadImage("https://raw.githubusercontent.com/clickersanonymousCU/clickersanonymousCU.github.io/master/graphics/wheat800.png");
	houseImg = loadImage("https://raw.githubusercontent.com/clickersanonymousCU/clickersanonymousCU.github.io/master/graphics/house.png");
	barnImg = loadImage("https://raw.githubusercontent.com/clickersanonymousCU/clickersanonymousCU.github.io/master/graphics/barn%20scaled.png");
	bg = loadImage("https://raw.githubusercontent.com/clickersanonymousCU/clickersanonymousCU.github.io/master/graphics/BG.jpg");
 	canvas.parent('sketch-holder');
 	if (collected == null) {
 		collected = 0;
 		applesPerS = 0;
 		AC = 0;
		WH = 0;
		HO = 0;
		CO = 0;
 		reqAC = 10;
 		reqWH = 50;
		reqHO = 100;
		reqCO = 1000;
 	}
 	//else {}
	scene = ['menu', 'game'];
	scene['menu'] = true;
}

function canvasProperties() {
	background(bg);
}


function draw() {
	if (scene['menu'] == true) {
		cursor(HAND);
		canvasProperties();
		textSize(60);
		fill(255);
		textAlign(CENTER);
		text("Get 'em Apples!", width/2, height/2);
		textSize(15);
		text("Click to start.", width/2, (height/5)*4);
		if (mouseIsPressed) {
			clear();
			scene['game'] = true;
			cursor(ARROW);
		}
	}
	if (scene['game'] == true) {
		canvasProperties();
		scene['menu'] = false;
		appleImg = createImg("https://raw.githubusercontent.com/clickersanonymousCU/clickersanonymousCU.github.io/master/graphics/Apple2.5_800.png");
		appleImg.size(appleImg.width/4, appleImg.height/4);
		//appleImg.position(580, 225);
		appleImg.center();
		appleImg.mousePressed(appleClicked);
		fill(225);
		rect(25, (canvas.height/7), 300, 100);
		rect(700, (canvas.height/7), 350, 390);
		//upgrades buttons
		var col = color(25, 23, 200, 50);
		//autoclicker button
		rect(700, (canvas.height/7)*2, 350, 80);
		image(handImg, 720, 165, handImg.width/9, handImg.height/9);
		ACButton = createButton(abbreviateNumber(reqAC));
		ACButton.style('background-color', col);
		ACButton.size(40, 30);
		ACButton.position(1153, 200);
		ACButton.mousePressed(ACClicked);
		//wheat button
		rect(700, (canvas.height/7)*3, 350, 80);
		image(wheatImg, 715, 225, wheatImg.width/12, wheatImg.height/12);
		WHButton = createButton(abbreviateNumber(reqWH));
		WHButton.style('background-color', col);
		WHButton.size(40, 30);
		WHButton.position(1153, 280);
		WHButton.mousePressed(WHClicked);
		//house button
		rect(700, (canvas.height/7)*4, 350, 80);
		image(houseImg, 710, 320, houseImg.width/8, houseImg.height/8);
		HOButton = createButton(abbreviateNumber(reqHO));
		HOButton.style('background-color', col);
		HOButton.size(40, 30);
		HOButton.position(1153, 355);
		HOButton.mousePressed(HOClicked);
		//company button
		rect(700, (canvas.height/7)*5, 350, 80);
		image(barnImg, 705, 390, barnImg.width/12, barnImg.height/12);
		COButton = createButton(abbreviateNumber(reqCO));
		COButton.style('background-color', col);
		COButton.size(40, 30);
		COButton.position(1153, 434);
		COButton.mousePressed(COClicked);
		textSize(35);
		fill(0);
		textAlign(LEFT);
		text("Collected:", 40, 115);
		text(abbreviateNumber(<%-apples%>.toFixed(1)), 235, 115);
		text("Apples/Sec:", 40, 155);
		text(abbreviateNumber(applesPerS.toFixed(1)), 235, 155);
		text("UPGRADES:", 770, 115);
		textSize(10);
		text("APPLIED: AC=            WH=            HO=            CO=            ", 760, 145);
		text(abbreviateNumber(AC), 840, 145);
		text(abbreviateNumber(WH), 895, 145);
		text(abbreviateNumber(HO), 950, 145);
		text(abbreviateNumber(CO), 1005, 145);
		textSize(17);
		text("Autoclicker", 800, 170);
		text("Wheat", 800, 250);
		text("House", 800, 325);
		text("Company", 800, 405);
		textSize(8);
		text("Another person has joined you!\nYou now have extra apple gathering power!", 800, 190);
		text("You have learned how to cultivate other kinds of food, \nso you are now capable of supporting a larger group \nof people. You can gather even more apples than before!", 800, 265);
		text("Your population of apple pickers has grown large \nenough to equire more permanant housing. \nYou learn how to build houses! \nYou can gather quite a lot of apples now!", 800, 340);
		text("You and your civilization pick so many apples that you \nhave successfully created an apple juice company! \nPeople around the world come to try your apple juice! \nYou gather so many apples, you don't even know what to do with \nthem anymore! Remember, with great power comes great responsibility.", 800, 420);
		fill(51);

	}
}

function mousePressed() {
	return false;
}

function appleClicked() {
	collected = collected + 1;
	console.log(collected);
}

function dApples() {
	applesPerS = (AC*0.2)+(WH*1)+(HO*8)+(CO*260);
	collected = collected + applesPerS;
	console.log(applesPerS);
}

function ACClicked() {
	if (collected >= reqAC) {
		AC = AC + 1;
		collected = collected - reqAC;
	}
	console.log(AC);
}
function WHClicked() {
	if (collected >= reqWH) {
		WH = WH + 1;
		collected = collected - reqWH;
	}
	console.log(WH);
}
function HOClicked() {
	if (collected >= reqHO) {
		HO = HO + 1;
		collected = collected - reqHO;
	}
	console.log(HO);
}
function COClicked() {
	if (collected >= reqHO) {
		CO = CO + 1;
		collected = collected - reqHO;
	}
	console.log(CO);
}

function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortNum = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}
