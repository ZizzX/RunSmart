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

  //validate

  function validForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Введите ваше имя",
          minlength: jQuery.validator.format(
            "Пожалуйста, введите не менее {0} символов"
          ),
        },
        phone: {
          required: "Введите ваш номер телефона",
        },
        email: {
          required: "Введите ваш email адрес",
          email: "Неправильно введен email адрес",
        },
      },
    });
  }

  validForm("#consultation form");
  validForm("#order form");
  validForm("#consultation-form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault;
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  //scroll up & smooth scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1200) {
      $(".scrollup").fadeIn();
    } else {
      $(".scrollup").fadeOut();
    }
  });

  $("a[href^='#']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();
});
