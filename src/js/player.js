var LO = {};

LO.Slider = function (element) {
  return (function(el) {

    var el = el; 
    var backBar = el.find(".bar");
    var progressBar = el.find(".progress");
    var scrubber = el.find(".scrubber");
    var state = {
      dragging: false
    };
    var progress = 0;
    var maxPercent

    function setPosition(percent) {
      scrubber.css('left', percent+"%");
      progressBar.css('width', percent+"%");
    }

    function getPosition() {
      return progress*100;
    };

    function getState() {
      return state;
    }

    function sliderMouseDown(e) {
      state.dragging = true;
      scrubber.addClass('active');
      var mouseOffset = ((e.pageX-scrubber.width()/2) - backBar.offset().left);
      progress = (mouseOffset / backBar.width());
      var percent = progress*100;
      var maxPos = (100-(100*scrubber.width()/backBar.width()));
      setPosition(
        Math.max(0, Math.min(percent, maxPos))
      );
    };

    function sliderMouseMove(e) {
      if(state.dragging) {
        var mouseOffset = ((e.pageX-scrubber.width()/2) - backBar.offset().left);
        progress = (mouseOffset / backBar.width());
        var percent = progress*100;
        var maxPos = (100-(100*scrubber.width()/backBar.width()));
        setPosition(
          Math.max(0, Math.min(percent, maxPos))
        );
      }
    };

    function sliderMouseUp(e) {
      state.dragging = false;
      scrubber.removeClass('active');
      el.trigger("sliderChange", [ progress ]);
    };

    el.on("mousedown", sliderMouseDown);
    el.on("mousemove", sliderMouseMove);
    el.on("mouseup", sliderMouseUp);

    return {
      element: el,
      getState: getState,
      setPosition: setPosition,
      getPosition: getPosition
    };
  
  })(element);
};

LO.AudioPlayer = function (audioElement, playerElement) {
  return (function(aE, pE) {
    var duration;
    var audio = aE[0];
    var playButton = pE.find('.play-pause');
    var slider = LO.Slider(pE.find('.slider'));

    function playClick() {
      if (audio.paused) {
        audio.play();
        $("body").addClass("playing").addClass("show-player");
      } else { // pause music
        audio.pause();
        $("body").removeClass("playing");
      }
    };

    function timeUpdate() {
      if(!slider.getState().dragging) {
        var playPercent = 100 * (audio.currentTime / duration);
        slider.setPosition(playPercent);
      }
      if(audio.currentTime == duration) {
        $("body").removeClass("playing");
      }
    };

    function sliderClick(e, progress) {
      audio.currentTime = duration*progress;
      audio.play();
      $("body").addClass("playing");
    };

    playButton.on("click", playClick);

    audio.addEventListener("canplaythrough", function() {
      duration = audio.duration;
    }, false);

    audio.addEventListener("timeupdate", timeUpdate, false);

    slider.element.on("sliderChange", sliderClick);

    return {
      play: playClick
    };
  })(audioElement, playerElement);
};

$(document).ready(function() {

  var audioPlayer = LO.AudioPlayer($("#musicEl"), $(".music-player"));
  
  $(".play-button").on("click", audioPlayer.play);

});