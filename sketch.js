let mobilenet;
let puffin;

function modelReady(){
	console.log("Model is ready!!!");
	mobilenet.predict(puffin, getResults);
}

function getResults(error, results){
	if(error){
		console.error(error);
	} else {
		console.log(results);
	}
}

function imageReady(){
	image(puffin, 0, 0, width, height);
}

function setup() {
	createCanvas(640, 480);
	puffin = createImg("images/puffin.jpeg", imageReady);
	puffin.hide()
	background(0);
	mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}
