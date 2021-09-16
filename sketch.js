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
	// console.log('jsondata', jsondata)
	createCanvas(640, 550);
	// webcam image classification
	video = createCapture(VIDEO);
	video.hide();
	// mobilenet = ml5.imageClassifier("MobileNet", modelReady); // image classifier ver
	mobilenet = ml5.imageClassifier("MobileNet", video, modelReady); // webcam ver
}

function draw(){
	background(0);
	image(video, 0, 0);
	fill(255);
	textSize(32);
	text(label, 10, height - 20);

	if (label === 'mask') {
		textSize(120);
		text('😷', width / 2, height / 2);
	}

	// const emojiFind = keys.map(key => any.find( a => {
	// 	a === key,
	// 	createImg(jsondata[a])
	// }));

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
		// console.log(results); // slow things down
		label = results[0].label; 
		any = label.split(' ')
		keys = Object.keys(jsondata);
		
		const emojiFind = keys.map(key => any.find( a => {
			a === key,
			createImg(jsondata[a])
		}));

		// emojiFind ? createImg(jsondata[label]) : createImg(jsondata.confused)

		// const emojiFind = url.find()
		// let prob = results[0].confidence;
		// createP(label);
		// createP(prob);
		myVoice.speak(`I see ${label}`);
		classifyVideo();
	}
}