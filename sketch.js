let mobilenet;
let video;
let label = '';
let keys = '';
let any = '';
let jsondata;
const myVoice = new p5.Speech();
const url = 'https://api.github.com/emojis';

function preload(){
	jsondata = loadJSON(url);
}

function setup() {
	createCanvas(640, 120);
	video = createCapture(VIDEO);
	mobilenet = ml5.imageClassifier("MobileNet", video, modelReady); // webcam ver
}

function draw(){
	background(0);
	fill(255);
	textSize(25);
	text(label, 10, height - 20);
}

function modelReady(){
	console.log("Model is ready!!!");
	classifyVideo();
}

function classifyVideo(){
	mobilenet.classify(gotResult);
}

function gotResult(error, results){
	if(error){
		console.error(error);
	} else {
		label = results[0].label; 
		any = label.replace('-', ' ').replace(',', '').split(' ')

		any.find(a => {
			if(jsondata[a]){
				let img = createImg(jsondata[a], a);
				img.position(10, 10);
				myVoice.speak(`I see ${a}`);
			} else {
				textSize(120);
				text('😷', 10, 10);
			}
		})
		setTimeout(classifyVideo, 2 * 1000);
	}
}