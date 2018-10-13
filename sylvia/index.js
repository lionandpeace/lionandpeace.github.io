links = {
	applemusic: "https://itunes.apple.com/gb/album/incel-nervous-twitch/1438912265?i=1438912584",
	spotify: "https://open.spotify.com/track/2ylJIi7UX5nFRjZ2U0Om7F?si=KrxDrP0QRLyUoyNRbUr63w",
	soundcloud: "https://soundcloud.com/lionandpeace/sylvia-the-house-incel-nervous-twitch"
}

$(document).ready(function(){
	$('.links').on('click', function(e){
		target = e.target;
		if(e.target.tagName == "I"){
			target = e.target.parentElement;
		}
		window.location.href = links[target.classList[0]];
	})
})