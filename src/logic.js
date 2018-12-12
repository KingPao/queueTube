var linkList = ['od6Ml8iQvOE'];
var currentVideoCounter = 0;

//TODO: Auf gültige YT URL prüfen
function getYtLink() {
    let link = $('#ytLink').val();
    let videoIdRegEx = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=/;
    let validYtUrl = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let videoId = link.replace(videoIdRegEx, '');

    if(!link.match(validYtUrl)){
        alert('Not a valid YT Link');
        $('#ytLink').val('');
        return;
    }

    linkList.push(videoId);
    console.log(linkList);
    $('#ytLink').val('');
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    $('#player').remove();
    $('body').append('<div id="player"></div>');
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: linkList[currentVideoCounter],
        playerVars: {
            autoplay: 1
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
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
    if (event.data == 0) {
        currentVideoCounter++;
        onYouTubeIframeAPIReady();

    }
}

function nextSong(event){
    currentVideoCounter++;
    onYouTubeIframeAPIReady();
}


function beforeSong(event){
    currentVideoCounter--;
    onYouTubeIframeAPIReady();
}

function stopVideo() {
    player.stopVideo();
}