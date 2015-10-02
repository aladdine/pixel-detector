var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	uploadedFile = document.getElementById('uploaded-file'),
	submittedLink = document.getElementById('submitted-link'),
	submitLink = document.getElementById('submit-link');

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
	// removes last / from url
	// var location = window.location.href.replace(/\/+$/,"");

	// load image
	// loadFile(location+'/images/sample.jpg');

    
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

	submittedLink.addEventListener()
}

function handleFile(file){
	var imageType = /image.*/;

	if (file.type.match(imageType)){
		var reader = new FileReader();	
		reader.onload = function(event){
			var tempImageStrore = new Image();
		
			tempImageStrore.onload = function(ev){
				canvas.height = ev.target.height;
				canvas.width = ev.target.width;
				context.drawImage(ev.target, 0, 0);
				drawGrid('horizontal',20,'red');
				drawGrid('vertical',20,'blue');
			}

		tempImageStrore.src = event.target.result;	

	}

	reader.readAsDataURL(file);	
		

	}
}



