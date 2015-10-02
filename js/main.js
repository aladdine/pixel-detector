var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	uploadedFile = document.getElementById('uploaded-file');

// draws horizontal and vertical grid
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
				drawGrid('horizontal',20,'red');
				drawGrid('vertical',20,'blue');
				image = context.getImageData(0,0,ev.target.width,ev.target.height);
				imageFromCanvas();
			}

			tempImageStrore.onload = returnImage;

		tempImageStrore.src = event.target.result;	
		}
	reader.readAsDataURL(file);	
	}
}

function imageFromCanvas(){
	var data = image.data;
	console.log("Number of pixels = " + (data.length / 4));
    var white = 0;
	for (i=0; i < data.length; i+=4){
		if ((data[i] == 0 && data[i+1]==0) && (data[i+2]==0 && data[i+3]==255)) {
			white += 1;
		}
	}

    console.log("Number of white pixels = " + white);

	//red effect in rgb scale
	for (i=0; i < data.length; i+=4){
		data[i]=0;
	}

	//green effect in rgb scale
	for (i=1; i < data.length; i+=4){
		//data[i]=0;
	}

	// blue effect in rgb scale
	for (i=2; i < data.length; i+=4){
		//data[i]=0;
	}

	// opacity in rgb scale
	for (i=3; i < data.length; i+=4){
		//data[i]=0;
	}

	image.data = data;
	context.putImageData(image,0,0);
}
