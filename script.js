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