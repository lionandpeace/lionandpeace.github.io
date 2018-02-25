$(document).ready(function(){
	setTimeout(function(){
		$('.content').css('opacity', 1);
	}, 100)

})

var _f = {

	defaultExtension: 'com',

	intervals: {

	},

	sound: false

}

$('ul.sects li').on('mouseover', function(e){
	extension = $(e.target).attr('ext')
	if(extension == "@") {
		$('.twitter-prefix').val(extension)
	}

	changeExtension(extension);

	try{
		_f.sound.fade(1, 0, 200);
	}catch(err){

	}

	chordFilename = 'chord'+$(e.target).attr('chord')+'.wav'

	_f.sound = new Howl({
		src: [chordFilename]
	});

	_f.sound.play();

	/*var sound = new Howl({
	  src: ['chord 0.wav']
	});

	sound.play();
	*/

})

$('ul.sects li').on('mouseleave', function(e){
	changeExtension(_f.defaultExtension)
	_f.sound.fade(1, 0, 400);
})

function changeExtension(extension){
	clearInterval(_f.intervals.deleteInterval);
	clearInterval(_f.intervals.inputInterval);

	currentExtension = $('.extension').text();
	if(currentExtension != extension){

		var keystrokes = currentExtension.length;
		_f.intervals.deleteInterval = setInterval(function(){

			if(--keystrokes == -1){
				clearInterval(_f.intervals.deleteInterval)

				var inputstrokes = extension.length;
				_f.intervals.inputInterval = setInterval(function(){

					if(--inputstrokes == -1){
						clearInterval(_f.intervals.inputInterval)
					}

					$('.extension').text( $('.extension').text() + extension.slice(0,1) );
					extension = extension.substr(1);

				}, 100)

			}

			$('.extension').text($('.extension').text().slice(0, -1))

		}, 55);

	}
}

function segueToAbout(){
	_f.defaultExtension = '';
	$('ul.sects li').css('opacity', 0);
	$('.name').addClass('about');
}

$('.about').on('click', function(){
	segueToAbout();
})