let mobilenet;
let puffin;
let video;
let label = '';
const myVoice = new p5.Speech();

function setup() {
	createCanvas(640, 550);
	// image classifier
	// puffin = createImg("images/puffin.jpeg", imageReady);
	// puffin.hide()

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
}

function modelReady(){
	console.log("Model is ready!!!");
	// used for image classification example
	// mobilenet.predict(puffin, gotResult);

	// webcam example
	// mobilenet.predict(gotResult);
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
		// let prob = results[0].confidence;
		// mobilenet.predict(gotResult)
		// createP(label);
		// createP(prob);
		myVoice.speak(`I see ${label}`);
		classifyVideo();
	}
}

// used for image classification example
// function imageReady(){
// 	image(puffin, 0, 0, width, height);
// }