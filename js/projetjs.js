const responsiveNavbar = (function () {
  const button = document.querySelector("#menu-icon");
  const navbar = document.querySelector("#navbar");

  if (button && navbar) {
    button.addEventListener("click", function () {
      navbar.classList.toggle("navbarResponsive");
    });
  }
})();

window.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("hearderSlide")) {
    $("#hearderSlide").multislider();
    $("#hearderSlide").multislider("pause");
  }
});
