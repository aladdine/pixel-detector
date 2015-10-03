// DOM elements associated with variables
var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	uploadedFile = document.getElementById('uploaded-file'),
	red = document.getElementById("color-red"),
	green = document.getElementById("color-green"),
	blue = document.getElementById("color-blue"),
	opacity = document.getElementById("color-opacity"),
	pixelCount = document.getElementById("number-of-pixels"),
	r = document.getElementById("r"), 
	g = document.getElementById("g"),
	b = document.getElementById("b"),
	op = document.getElementById("op"),
	coloredPixelCount = document.getElementById("number-of-colored-pixels");

// draws horizontal and vertical grid delta apart
function drawGrid(orientation,delta,gridColor) {
	var n = 0;
	var delta = 20;
	for (var i=0; i <= (500/delta); i++) {
		context.beginPath();
		if (orientation == 'horizontal') {
			context.moveTo(0, n);
			context.lineTo(500, n);
		} else {
			context.moveTo(n, 0);
			context.lineTo(n, 500);
		}	
		context.strokeStyle = gridColor;
		context.stroke();
		n += delta;
	}

	// draws rectangle for reference
	context.fillRect(delta,delta,delta,delta);
}

// wait for page to load 
window.addEventListener('DOMContentLoaded', initImageLoader);

function initImageLoader(){
	
    
	window.addEventListener('dragover', function(e){
		e.preventDefault();
	}, true);

	window.addEventListener('drop', function(e){
		var data = e.dataTransfer;
		e.preventDefault();
		handleFile(data.files[0]);
	});

	uploadedFile.addEventListener('change', handleManualUploadedFiles);

	function handleManualUploadedFiles(ev){
		var file = ev.target.files[0];
		handleFile(file);
	}
	
}

function handleFile(file){
	var imageType = /image.*/;

	if (file.type.match(imageType)){
		var reader = new FileReader();	
		reader.onload = function(event){
			var tempImageStrore = new Image();
	
			var returnImage = function(ev){
				canvas.height = ev.target.height;
				canvas.width = ev.target.width;
				context.drawImage(ev.target, 0, 0);
				drawGrid('horizontal',20,'blue');
				drawGrid('vertical',20,'blue');
				image = context.getImageData(0,0,ev.target.width,ev.target.height);
				// each 4 susbsequent elements of the image.data array represent one pixel
				pixelCount.innerHTML = (image.data.length/4);			
			}
       
			tempImageStrore.onload = returnImage;
			red.onchange = imageFromCanvasRed;
			green.onchange = imageFromCanvasGreen;
			blue.onchange = imageFromCanvasBlue;
			opacity.onchange = imageFromCanvasOpacity;
			r.onchange = imageFromCanvas;
			g.onchange = imageFromCanvas;
			b.onchange = imageFromCanvas;
			op.onchange = imageFromCanvas;

			// note: filter functions above kept separate so they can be modified separately

		tempImageStrore.src = event.target.result;	
		}
	reader.readAsDataURL(file);	
	}
}

function imageFromCanvasRed(){
	var data = image.data;

	//add color effect in rgb scale (r,g,b,opacity) <=> (data[i],g,b,opacity)
	for (i=0; i < data.length; i+=4){
		data[i] = red.value; // add red
	}

	document.getElementById('color-red-val').innerHTML = "(Red = " + red.value + "/255)";

	image.data = data;
	context.putImageData(image,0,0);
	presentColors(image.data);
}

function imageFromCanvasGreen(){
	var data = image.data;

	//add color effect in rgb scale (r,g,b,opacity) <=> (r,data[i+1],b,opacity)
	for (i=0; i < data.length; i+=4){
		data[i+1] = green.value; // add green
	}

	document.getElementById('color-green-val').innerHTML = "(Green = " + green.value + "/255)";

	image.data = data;
	context.putImageData(image,0,0);
	presentColors(image.data);
}

function imageFromCanvasBlue(){
	var data = image.data;

	//add color effect in rgb scale (r,g,b,opacity) <=> (r,g,data[i+2],opacity)
	for (i=0; i < data.length; i+=4){
		data[i+2] = blue.value; // add blue
	}

	document.getElementById('color-blue-val').innerHTML = "(Blue = " + blue.value + "/255)";

	image.data = data;
	context.putImageData(image,0,0);
	presentColors(image.data);
}

function imageFromCanvasOpacity(){
	var data = image.data;
    
	//add color effect in rgb scale (r,g,b,opacity) <=> (r,g,b,data[i+3])
	for (i=0; i < data.length; i+=4){
		data[i+3] = opacity.value; // add opacity
	}
	document.getElementById('color-opacity-val').innerHTML = "(Opacity = " + opacity.value + "/255)";
	image.data = data;
	context.putImageData(image,0,0);
	presentColors(image.data);
}

function imageFromCanvas(){
	var data = image.data;
	presentColors(data);
}


function presentColors(data){
	var data = data;
	var count = 0;
	for (i=0; i < data.length; i+=4){
		if ((data[i] == r.value && data[i+1]==g.value) && (data[i+2]==b.value && data[i+3]==op.value)) {
			count += 1;
		}
	}
    coloredPixelCount.innerHTML = "Number of pixels (" + r.value + "," + g.value + "," + b.value + "," + op.value + ") = ";
    coloredPixelCount.innerHTML += count + " pixels";
}