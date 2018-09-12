var numBlocksMatched = 0;

document.addEventListener('DOMContentLoaded', function () {
	var colourBlocks = document.querySelectorAll('#red, #green, #blue');
	var matchingBlocks = document.querySelectorAll('#red-border, #blue-border, #green-border');

	for(var i=0; i < colourBlocks.length; i++) {
		colourBlocks[i].addEventListener('dragover', function(e) {
			e.preventDefault();
		});

		matchingBlocks[i].addEventListener('dragover', function(e) {
			e.preventDefault();
		});

		colourBlocks[i].addEventListener('dragstart', function(e) {
			e.dataTransfer.setData('text', e.target.id);
		});

		matchingBlocks[i].addEventListener('drop', function(e) {
			e.preventDefault();
			var data = e.dataTransfer.getData('text');
			e.target.appendChild(document.getElementById(data));
			console.log('dropped within border colour ' + e.target.id);

			if(data == e.target.id.substr(0, e.target.id.indexOf('-'))) {
				// Matching colour block
				numBlocksMatched++;
			}
		});
	}

	document.querySelector('.done').addEventListener('click', showOutcome);

	var close = document.querySelectorAll('.close');
	for(var i=0; i < close.length; i++) {
		close[i].addEventListener('click', closeOutcome);
	}
});

function showOutcome() {
	if(numBlocksMatched === 3) {
		// Yay! All colour blocks have been successfully matched
		if(!document.querySelector('.try-again').classList.contains('hidden')) {
			document.querySelector('.try-again').classList.add('hidden');
		}
		document.querySelector('.success').classList.remove('hidden');
	}
	else {
		document.querySelector('.try-again').classList.remove('hidden');
	}
}

function closeOutcome() {
	var outcomes = document.querySelectorAll('.outcome');
	for(var i=0; i < outcomes.length; i++) {
		outcomes[i].classList.add('hidden');
	}
}
