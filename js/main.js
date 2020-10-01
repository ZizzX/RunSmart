$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    // adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="img/icon/carousel/left.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="img/icon/carousel/right.png"></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          dots: true,
          arrows: false,
          dotsClass: "slick-dots",
        },
      },
    ],
    autoplay: false,
    autoplaySpeed: 2000,
  });

  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //modal
  $("[data-consultation=consultation]").on("click", function () {
    $("#consultation, .overlay").fadeIn("slow");
  });
  $(".modal-close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });
  $(".catalog-item__btn").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $("#order, .overlay").fadeIn("slow");
    });
  });
});

// const slider = tns({
//   container: ".carousel__inner",
//   items: 1,
//   slideBy: "page",
//   autoplay: false,
//   controls: false,
//   touch: true,
//   autoHeight: true,
//   responsive: {
//     1200: {
//       nav: false,
//     },
//     320: {
//       nav: true,
//     },
//   },
// });

// document.querySelector(".prev").addEventListener("click", function () {
//   slider.goTo("prev");
// });

// document.querySelector(".next").addEventListener("click", function () {
//   slider.goTo("next");
// });
