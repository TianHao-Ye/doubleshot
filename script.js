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
    // Initialize panzoom on the lightbox image
    var $zoomContainer = $("#zoom-container");
    var $lightboxImg = $("#lightbox-img");
    
    $lightboxImg.panzoom();

    // Disable panzoom when pinch gesture is detected
    $lightboxImg.on("touchstart", function(e) {
        if (e.originalEvent.touches.length > 1) {
            $lightboxImg.panzoom("disable");
        }
    });

    // Enable panzoom when pinch gesture ends
    $lightboxImg.on("touchend", function() {
        $lightboxImg.panzoom("enable");
    });

    // Handle double-tap to zoom in and out
    $lightboxImg.on("doubletap", function() {
        $lightboxImg.panzoom("zoom", "toggle");
    });
});

