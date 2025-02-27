// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
var done = false;
function onPlayerStateChange(event) {
  console.log(event.data);
}

function stopVideo() {
  player.stopVideo();
}

document.addEventListener("DOMContentLoaded", function() {
    const socket = io();
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const track = document.getElementById('track');

    playButton.addEventListener('click', () => {
        player.playVideo();
        socket.emit('play');
    });

    pauseButton.addEventListener('click', () => {
        player.pauseVideo();
        socket.emit('pause');
    });

    track.addEventListener('click', (event) => {
        const percent = event.offsetX / track.offsetWidth;
        const duration = player.getDuration();
        player.seekTo(duration * percent, true);
        socket.emit('seek', duration * percent);
    });

    socket.on('connect', function() {
        console.log('Connected to server');
    });

    socket.on('disconnect', function() {
        console.log('Disconnected from server');
    });

    socket.on('play', function() {
        player.playVideo();
    });

    socket.on('pause', function() {
        player.pauseVideo();
    });

    socket.on('seek', function(data) {
        player.seekTo(data, true);
    });
});
