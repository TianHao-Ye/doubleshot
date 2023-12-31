//navigation bar of website
$(document).ready(function() {
  /*sticky navigation bar*/
  const navbar = $("#navbar");
  const sticky = navbar.offset().top;

  // When the user scrolls the page, execute myFunction
  $(window).scroll(function() {
    toShowNavBar();
  });

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function toShowNavBar() {
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
    });
});

$(document).ready(function() {
    // Function to filter the images based on the selected category
    function filterImages(category) {
        $(".portfolio-grid div").hide();
        $(".portfolio-grid div[data-category='" + category + "']").show();
    }

    // Initial category is "graduation"
    let currentCategory = "graduation";

    // Trigger a click event on the "graduation" category button
    $(".category-button[data-category='graduation']").addClass("active");
    filterImages("graduation");


    $(".category-button").click(function() {
        // Remove the "active" class from all buttons
        $(".category-button").removeClass("active");
        
        // Add the "active" class to the clicked button
        $(this).addClass("active");

        // Get the data-category attribute of the clicked button
        const newCategory = $(this).data("category");

        // Filter the images based on the selected category
        filterImages(newCategory);

        // Update the current category
        currentCategory = newCategory;
    });
});

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

    // Variables for tracking zoom
    let scaleFactor = 1;
    let lastScaleFactor = 1;
    let posX = 0;
    let posY = 0;

    // Function to open the lightbox with a specific image
    function openLightbox(index, category) {
        const filteredImages = $(".portfolio-grid div[data-category='" + category + "'] img");
        lightboxImg.attr("src", filteredImages.eq(index).attr("src"));
        currentIndex = index;
        currentCategory = category;
        // Disable scrolling by setting the body's overflow to hidden
        $("body").css("overflow", "hidden");
        lightbox.show();
        if (isMobileDevice()) {
            lightboxPrev.hide();
            lightboxNext.hide();
        } else {
            lightboxPrev.show();
            lightboxNext.show();
        }
    }

    function isMobileDevice() {
        return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }

    // Click event handlers for all images
    $(".portfolio-grid div").click(function() {
        const index = $(this).index();
        const category = $(this).data("category"); // Get the category of the clicked image
        openLightbox(index, category);
    });

    // Click event handler for the close button
    lightboxClose.click(function() {
        resetImagePosition(); // Reset image position and scale
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

    // Function to reset image position and scale
    function resetImagePosition() {
        scaleFactor = 1; // Reset the scale factor to 1
        posX = 0; // Reset the X position to 0
        posY = 0; // Reset the Y position to 0       
        lightboxImg.css("transform", "scale(" + scaleFactor + ") translate(" + posX + "px, " + posY + "px)");
    }

    // Function to close the lightbox
    function closeLightbox() {
        // Enable scrolling by setting the body's overflow to auto
        $("body").css("overflow", "auto");
        lightbox.hide();
    }

    // Function to navigate to the previous image in the lightbox
    function goToPreviousImage() {
        currentIndex = (currentIndex - 1 + $(".portfolio-grid div[data-category='" + currentCategory + "'] img").length) % $(".portfolio-grid div[data-category='" + currentCategory + "'] img").length;
        openLightbox(currentIndex, currentCategory);
    }

    // Function to navigate to the next image in the lightbox
    function goToNextImage() {
        currentIndex = (currentIndex + 1) % $(".portfolio-grid div[data-category='" + currentCategory + "'] img").length;
        openLightbox(currentIndex, currentCategory);
    }

    // Event listener for keyboard actions
    $(document).keydown(function(e) {
        if (lightbox.is(":visible")) {
            switch (e.keyCode) {
                case 37: // Left arrow key
                    goToPreviousImage();
                    break;
                case 39: // Right arrow key
                    goToNextImage();
                    break;
                case 38: // Page up key
                    goToPreviousImage();
                    break;
                case 40: // Page down key
                    goToNextImage();
                    break;
                case 27: // ESC key
                    resetImagePosition();
                    closeLightbox();
                    break;
            }
        }
    });

    // Initialize Hammer.js on the lightbox container for pinch and double-tap gestures
    let hammer = new Hammer(lightboxImg[0]);
    // Variable to track if the user is in pan mode
    let isPanning = false;
    let translateX = 0;
    let translateY = 0;
    let startX = 0;
    let startY = 0;

    // Handle pinch gesture to zoom in and out
    hammer.get("pinch").set({ enable: true });

    hammer.on("pinchstart", function(e) {
        lastScaleFactor = scaleFactor;
    });

    hammer.on("pinch", function(e) {
        scaleFactor = Math.max(1, Math.min(lastScaleFactor * e.scale, 3));
        lightboxImg.css("transform", "scale(" + scaleFactor + ")");
    });

    // Handle double-tap to reset zoom
    hammer.on("doubletap", function() {
        resetImagePosition();
    });

    // Swipe left and right to navigate between images
    hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on("swiperight", function() {
        if (scaleFactor === 1 && !isPanning) {
            // Handle swipe right (previous image)
            goToPreviousImage();
        }
    });

    hammer.on("swipeleft", function() {
        if (scaleFactor === 1 && !isPanning) {
            // Handle swipe left (next image)
            goToNextImage();
        }
    });

    // Function to handle pan gesture
    hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });

    hammer.on("panstart", function(e) {
        // Check if the scaleFactor is not equal to 1
        if (scaleFactor !== 1) {
            isPanning = true;
            startX = e.center.x;
            startY = e.center.y;
        }
    });

    hammer.on("panmove", function(e) {
        if (isPanning) {
            // Calculate the distance moved
            const deltaX = e.center.x - startX;
            const deltaY = e.center.y - startY;

            // Update the translate values
            translateX += deltaX;
            translateY += deltaY;

            // Apply the translate values to the image
            lightboxImg.css("transform", "scale(" + scaleFactor + ") translate(" + (posX + translateX) + "px, " + (posY + translateY) + "px)");

            // Update the start position for the next move event
            startX = e.center.x;
            startY = e.center.y;
        }
    });

    hammer.on("panend", function() {
        isPanning = false;
    });
});
