$(document).ready(function() {

  /*sticky navigation bar*/
  const navbar = $("#navbar");
  const sticky = navbar.offset().top;

  // When the user scrolls the page, execute myFunction
  $(window).scroll(function() {
      myFunction();
  });

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
      if ($(window).scrollTop() >= sticky) {
          navbar.addClass("sticky");
      } else {
          navbar.removeClass("sticky");
      }
  }

  /*navigation bar toggle list*/
  const navToggle = $(".navbar-toggler");
  const navContent = $(".nav-content ul");
  const firstLi = navContent.find("li:contains('Double Shot Studio')");

  // Toggle list items when the button is clicked
  navToggle.click(function() {
      navContent.toggleClass("show-list");
      firstLi.toggle();
  });

  // Check screen width on load and resize
  function checkScreenWidth() {
    if ($(window).width() >= 576) {
        navContent.removeClass("show-list");
        firstLi.show();
    }
}

  // Run the check on load and when the window is resized
  checkScreenWidth();
  $(window).resize(checkScreenWidth);

});

$(document).ready(function() {
    // Attach the triggerJump function to the WeChat link click event
    $("#wechat").click(function() {
        // Find the element to animate (the one with the class 'jump-link')
        const elementToAnimate = $(".jump-link");

        // Add the 'jump' class to start the animation
        elementToAnimate.addClass("jump");

        // // After a delay, remove the 'jump' class to reset the animation
        // setTimeout(function() {
        //     elementToAnimate.removeClass("jump");
        // }, 4000); // Adjust the delay as needed (1 second in this example)
    });
});


$(document).ready(function() {
    // Initial category is "graduation"
    let currentCategory = "graduation";

    $(".category-button").click(function() {
        // Remove the "active" class from all buttons
        $(".category-button").removeClass("active");
        
        // Add the "active" class to the clicked button
        $(this).addClass("active");

        // Get the data-category attribute of the clicked button
        const newCategory = $(this).data("category");

        // Filter the images based on the selected category
        $(".portfolio-grid div").hide();
        $(".portfolio-grid div[data-category='" + newCategory + "']").show();

        // Update the current category
        currentCategory = newCategory;
    });
});


// JavaScript
$(document).ready(function() {
    // Lightbox variables
    const lightbox = $("#lightbox");
    const lightboxImg = $("#lightbox-img");
    const lightboxPrev = $("#lightbox-prev");
    const lightboxNext = $("#lightbox-next");
    const lightboxClose = $("#lightbox-close");

    // Variables to track the currently displayed image index and category
    let currentIndex = 0;
    let currentCategory = "";

    // Function to open the lightbox with a specific image
    function openLightbox(index, category) {
        const filteredImages = $(".portfolio-grid div[data-category='" + category + "'] img");
        lightboxImg.attr("src", filteredImages.eq(index).attr("src"));
        currentIndex = index;
        currentCategory = category;
        // Disable scrolling by setting the body's overflow to hidden
        $("body").css("overflow", "hidden");
        lightbox.show();
    }

    // Function to close the lightbox
    function closeLightbox() {
        // Enable scrolling by setting the body's overflow to auto
        $("body").css("overflow", "auto");
        lightbox.hide();
    }

    // Click event handlers for all images
    $(".portfolio-grid div").click(function() {
        const index = $(this).index();
        const category = $(this).data("category"); // Get the category of the clicked image
        openLightbox(index, category);
    });

    // Click event handler for the close button
    lightboxClose.click(function() {
        closeLightbox();
    });

    // Click event handler for the previous button
    lightboxPrev.click(function() {
        currentIndex = (currentIndex - 1 + $(".portfolio-grid div[data-category='" + currentCategory + "'] img").length) % $(".portfolio-grid div[data-category='" + currentCategory + "'] img").length;
        openLightbox(currentIndex, currentCategory);
    });

    // Click event handler for the next button
    lightboxNext.click(function() {
        currentIndex = (currentIndex + 1) % $(".portfolio-grid div[data-category='" + currentCategory + "'] img").length;
        openLightbox(currentIndex, currentCategory);
    });
});


$(document).ready(function() {
    var $lightbox = $("#lightbox");
    var $lightboxImg = $("#lightbox-img");

    // Initialize Hammer.js on the lightbox container
    var hammer = new Hammer($lightboxImg[0]);

    // Variables for tracking zoom and pan
    var scaleFactor = 1;
    var lastScaleFactor = 1;
    var lastPosX = 0;
    var lastPosY = 0;
    var posX = 0;
    var posY = 0;

    // Handle pinch gesture to zoom in and out
    hammer.get("pinch").set({ enable: true });

    hammer.on("pinchstart", function(e) {
        lastScaleFactor = scaleFactor;
    });

    hammer.on("pinch", function(e) {
        scaleFactor = Math.max(1, Math.min(lastScaleFactor * e.scale, 3));
        $lightboxImg.css("transform", "scale(" + scaleFactor + ") translate(" + posX + "px, " + posY + "px)");
    });

    // Handle pan/drag gesture
    hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });

    hammer.on("panstart", function(e) {
        lastPosX = posX;
        lastPosY = posY;
    });

    hammer.on("pan", function(e) {
        posX = lastPosX + e.deltaX;
        posY = lastPosY + e.deltaY;
        $lightboxImg.css("transform", "scale(" + scaleFactor + ") translate(" + posX + "px, " + posY + "px)");
    });

    // Handle double-tap to reset zoom
    hammer.on("doubletap", function() {
        scaleFactor = 1;
        posX = 0;
        posY = 0;
        $lightboxImg.css("transform", "scale(" + scaleFactor + ") translate(" + posX + "px, " + posY + "px)");
    });
});

