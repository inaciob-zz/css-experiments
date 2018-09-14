var numBlocksMatched = 0;
var allBlocksMatched = false;

document.addEventListener('DOMContentLoaded', function () {
	var colourBlocks = document.querySelectorAll('#red, #green, #blue');
	var matchingBlocks = document.querySelectorAll('.colour-container');

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
				if(numBlocksMatched > 3) {
					// This exists as part of a bug fix
					numBlocksMatched = 3;
				}
			}
			else {
				return false;
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
	var matchingColourBlocks = document.querySelectorAll('.colour-container');
	var numMatches = 0;

	for(var i=0; i < matchingColourBlocks.length; i++) {
		var currColourContainer = matchingColourBlocks[i];
		if(currColourContainer.childNodes.length === 1 && currColourContainer.childNodes[0].id == currColourContainer.id.substr(0, currColourContainer.id.indexOf('-'))) {
			numMatches++;
		}
	}

	if(numMatches === 3) {
		allBlocksMatched = true;
	}
	else {
		allBlocksMatched = false;
	}

	// The purpose of this check is to ensure all colour-container elements contain the single correct matching draggable block
	if(numBlocksMatched === 3 && allBlocksMatched) {
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