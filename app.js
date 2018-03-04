$(document).ready(function(){
	setTimeout(function(){
		$('.content').css('opacity', 1);
	}, 100)

})

$('.sound-off').on('click', function(){
	_f.shouldSound=!_f.shouldSound;
})

var _f = {

	defaultExtension: 'com',

	intervals: {

	},

	setCookie: function(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},

	getCookie: function(name){
		var dc = document.cookie;
		var prefix = name + "=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) {
			begin = dc.indexOf(prefix);
			if (begin != 0) return null;
		}
		else
		{
		begin += 2;
		var end = document.cookie.indexOf(";", begin);
		if (end == -1) {
		end = dc.length;
		}
		}
		// because unescape has been deprecated, replaced with decodeURI
		//return unescape(dc.substring(begin + prefix.length, end));
		return decodeURI(dc.substring(begin + prefix.length, end));
	},

	sound: false,

	shouldSound: true

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

	if(_f.shouldSound){
		chordFilename = 'chord'+$(e.target).attr('chord')+'.wav'

		_f.sound = new Howl({
			src: [chordFilename]
		});

		_f.sound.play();
	}

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
	$('.content').css('opacity', 0);
	$('.about-me').css('opacity', 1);
	setTimeout(function(){
		$('.content').hide();
	}, 200);

}

function hide(){
	$('.content').css('opacity', 1);
	$('.about-me').css('opacity', 0);
	setTimeout(function(){
		$('.content').show();
	}, 200);

}

$('.about').on('click', function(){
	segueToAbout();
})
