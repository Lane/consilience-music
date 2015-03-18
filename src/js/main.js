
$("nav a, #nav li a").on("click", function() {
  $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top+1 }, 500);
  return false;
});

$("#nav-toggle").on("click", function() {
  $(this).parent().toggleClass("active");
});

// init controller
var controller = new ScrollMagic.Controller();

// build tween
//var backgroundTween = TweenMax.to("#headerBg", 0.5, {css: {y: 400}, ease: Linear.easeNone});
var contentTween = 
  TweenMax.to(
    "#intro .grid", 
    1, 
    {
      css: {
        y: 200,
        opacity:0
      }, 
      ease: Linear.easeIn
    }
  );

// create a scene

var scene = new ScrollMagic.Scene({
                duration: $('.intro').outerHeight(),  // the scne should last for a scroll distance of 100px
                offset: 0      // start this scene after scrolling for 50px
              })
              .setTween(contentTween)
              .addTo(controller); // assign the scene to the controller


var navigation = new ScrollMagic.Scene({ 
                offset: $("#music").position().top,
                duration: $("#music").outerHeight()
              })
              .setClassToggle("#nav","fixed-music")
              .addTo(controller);

var navigation2 = new ScrollMagic.Scene({ 
                offset: $("#bio").position().top,
                duration: $("#bio").outerHeight()
              })
              .setClassToggle("#nav","fixed-bio")
              .addTo(controller);

var navigation2 = new ScrollMagic.Scene({ 
                offset: $("#merch").position().top,
                duration: $("#merch").outerHeight()
              })
              .setClassToggle("#nav","fixed-merch")
              .addTo(controller);